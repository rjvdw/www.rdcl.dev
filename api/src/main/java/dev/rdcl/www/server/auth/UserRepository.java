package dev.rdcl.www.server.auth;

import dev.rdcl.www.server.auth.entities.UserEntity;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.Optional;
import java.util.UUID;

@ApplicationScoped
public class UserRepository implements PanacheRepositoryBase<UserEntity, UUID> {

    public UserEntity findByEmail(String email) {
        return find("email = ?1", email).singleResult();
    }

    public Optional<UserEntity> findByEmailOptional(String email) {
        return find("email = ?1", email).singleResultOptional();
    }

}
