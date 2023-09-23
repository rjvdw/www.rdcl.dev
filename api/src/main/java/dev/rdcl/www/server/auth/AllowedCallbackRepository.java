package dev.rdcl.www.server.auth;

import dev.rdcl.www.server.auth.entities.AllowedCallbackEntity;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;

import java.net.URL;
import java.util.UUID;

@ApplicationScoped
public class AllowedCallbackRepository implements PanacheRepositoryBase<AllowedCallbackEntity, UUID> {

    public AllowedCallbackEntity findByUrl(URL url) {
        return find("url = ?1", url).singleResult();
    }

}
