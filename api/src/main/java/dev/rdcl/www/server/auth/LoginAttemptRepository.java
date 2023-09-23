package dev.rdcl.www.server.auth;

import dev.rdcl.www.server.auth.entities.LoginAttemptEntity;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.NoResultException;

import java.time.Instant;

@ApplicationScoped
public class LoginAttemptRepository implements PanacheRepositoryBase<LoginAttemptEntity, LoginAttemptEntity.PrimaryKey> {

    public LoginAttemptEntity findBySessionTokenAndVerificationCode(
        String sessionToken,
        String verificationCode,
        Instant notBefore
    ) {
        LoginAttemptEntity.PrimaryKey id = LoginAttemptEntity.PrimaryKey.builder()
            .sessionToken(sessionToken)
            .verificationCode(verificationCode)
            .build();

        LoginAttemptEntity loginAttempt = findById(id);

        if (loginAttempt == null) {
            throw new NoResultException();
        }

        if (loginAttempt.getCreated().isBefore(notBefore)) {
            delete(loginAttempt);
            throw new NoResultException();
        }

        return loginAttempt;
    }

    public void deleteWhereCreatedBefore(Instant before) {
        delete("created < ?1", before);
    }
}
