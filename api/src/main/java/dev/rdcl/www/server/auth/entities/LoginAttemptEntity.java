package dev.rdcl.www.server.auth.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.io.Serializable;
import java.time.Instant;

@Entity(name = "LoginAttempt")
@Table(name = "login_attempt", schema = "auth")
@IdClass(LoginAttemptEntity.PrimaryKey.class)
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginAttemptEntity {

    @Id
    @Column(name = "session_token", nullable = false, updatable = false)
    private String sessionToken;

    @Id
    @Column(name = "verification_code", nullable = false, updatable = false)
    private String verificationCode;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "\"user\"", nullable = false, updatable = false)
    private UserEntity user;

    @Column(name = "created", nullable = false, updatable = false)
    @CreationTimestamp
    private Instant created;

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class PrimaryKey implements Serializable {
        private String sessionToken;
        private String verificationCode;
    }

}
