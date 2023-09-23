package dev.rdcl.www.server.auth;

import dev.rdcl.www.server.auth.entities.LoginAttemptEntity;
import dev.rdcl.www.server.auth.entities.UserEntity;
import dev.rdcl.www.server.auth.events.EmailLoginInitiated;
import dev.rdcl.www.server.auth.events.EmailLoginStarted;
import dev.rdcl.www.server.auth.exceptions.InvalidCallback;
import dev.rdcl.www.server.auth.exceptions.LoginAttemptNotFound;
import io.quarkus.scheduler.Scheduled;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.event.Event;
import jakarta.enterprise.event.ObservesAsync;
import jakarta.enterprise.event.Reception;
import jakarta.persistence.NoResultException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.apache.commons.codec.binary.Base64;

import java.net.URL;
import java.security.SecureRandom;
import java.time.Instant;
import java.util.concurrent.CompletionStage;

@ApplicationScoped
@RequiredArgsConstructor
public class AuthService {

    private final AuthProperties authProperties;

    private final MailService mailService;
    private final JwtService jwtService;

    private final UserRepository userRepository;
    private final AllowedCallbackRepository allowedCallbackRepository;
    private final LoginAttemptRepository loginAttemptRepository;

    private final Event<EmailLoginStarted> emailLoginStartedEvent;
    private final Event<EmailLoginInitiated> emailLoginInitiatedEvent;

    @Transactional
    public String initiateLogin(String email, URL callback) {
        validateCallback(callback);

        String sessionToken = generateToken(authProperties.sessionTokenLength());

        userRepository.findByEmailOptional(email)
            .ifPresent((user) -> {
                emailLoginStartedEvent.fireAsync(new EmailLoginStarted(
                    user.getEmail(),
                    callback,
                    sessionToken
                ));
            });

        return sessionToken;
    }

    @Transactional
    public CompletionStage<EmailLoginInitiated> consume(
        @ObservesAsync(notifyObserver = Reception.IF_EXISTS) EmailLoginStarted event
    ) {
        try {
            UserEntity user = userRepository.findByEmail(event.email());
            String verificationCode = generateToken(authProperties.verificationCodeLength());

            LoginAttemptEntity loginAttempt = LoginAttemptEntity.builder()
                .sessionToken(event.sessionToken())
                .verificationCode(verificationCode)
                .user(user)
                .build();

            loginAttemptRepository.persist(loginAttempt);

            mailService.sendVerificationMail(
                user.getEmail(),
                verificationCode,
                event.callback()
            );

            return emailLoginInitiatedEvent.fireAsync(
                EmailLoginInitiated.initiated(user.getEmail())
            );
        } catch (NoResultException ex) {
            return emailLoginInitiatedEvent.fireAsync(
                EmailLoginInitiated.failed(event.email(), "user not found")
            );
        }
    }

    @Scheduled(every = "1h")
    @Transactional
    public void cleanUpOldLoginAttempts() {
        loginAttemptRepository.deleteWhereCreatedBefore(expiryThreshold());
    }

    @Transactional
    public String verifyLogin(String sessionToken, String verificationCode) {
        try {
            LoginAttemptEntity loginAttempt = loginAttemptRepository.findBySessionTokenAndVerificationCode(
                sessionToken,
                verificationCode,
                expiryThreshold()
            );

            String jwt = jwtService.issueAuthToken(loginAttempt.getUser());
            loginAttemptRepository.delete(loginAttempt);

            return jwt;
        } catch (NoResultException ex) {
            throw new LoginAttemptNotFound();
        }
    }

    private Instant expiryThreshold() {
        return Instant.now().minusSeconds(authProperties.maxLoginAttemptDurationSeconds());
    }

    private void validateCallback(URL callback) {
        if (callback == null) return;

        try {
            allowedCallbackRepository.findByUrl(callback);
        } catch (NoResultException ex) {
            throw new InvalidCallback(callback);
        }
    }

    private String generateToken(int length) {
        SecureRandom random = new SecureRandom();
        byte[] token = new byte[length];
        random.nextBytes(token);
        return Base64.encodeBase64URLSafeString(token);
    }
}
