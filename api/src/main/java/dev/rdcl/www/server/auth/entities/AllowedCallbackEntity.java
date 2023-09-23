package dev.rdcl.www.server.auth.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.net.URL;
import java.util.UUID;

@Entity(name = "AllowedCallback")
@Table(name = "allowed_callback", schema = "auth")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AllowedCallbackEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", nullable = false, insertable = false, updatable = false)
    private UUID id;

    @Column(name = "url", nullable = false, unique = true, length = 511)
    private URL url;
}
