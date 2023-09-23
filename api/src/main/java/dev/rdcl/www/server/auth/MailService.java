package dev.rdcl.www.server.auth;

import io.quarkus.mailer.Mail;
import io.quarkus.mailer.Mailer;
import io.quarkus.qute.CheckedTemplate;
import io.quarkus.qute.TemplateInstance;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.ws.rs.core.UriBuilder;
import lombok.RequiredArgsConstructor;
import lombok.extern.jbosslog.JBossLog;

import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.List;

@ApplicationScoped
@RequiredArgsConstructor
@JBossLog
public class MailService {

    private final AuthProperties authProperties;
    private final Mailer mailer;

    public void sendVerificationMail(String recipient, String verificationCode, URL callback) {
        try {
            URL baseUrl = callback == null ? authProperties.defaultLoginCallbackUrl() : callback;
            URI verificationLink = UriBuilder.fromUri(baseUrl.toURI())
                .queryParam("verification-code", verificationCode)
                .build();

            Mail mail = new Mail();

            mail.setFrom(authProperties.verificationEmailFrom());
            mail.setTo(List.of(recipient));
            mail.setSubject("Login request");
            mail.setText(Templates.verificationMailText(verificationLink).render());
            mail.setHtml(Templates.verificationMailHtml(verificationLink).render());

            mailer.send(mail);
        } catch (URISyntaxException ex) {
            log.errorf("Could not create verification link: %s", ex.getMessage());
        }
    }

    @CheckedTemplate(basePath = "auth/mail")
    public static class Templates {
        public static native TemplateInstance verificationMailText(URI verificationLink);

        public static native TemplateInstance verificationMailHtml(URI verificationLink);
    }
}
