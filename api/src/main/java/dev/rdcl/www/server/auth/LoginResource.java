package dev.rdcl.www.server.auth;

import dev.rdcl.www.server.auth.exceptions.InvalidCallback;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import lombok.RequiredArgsConstructor;

import java.net.MalformedURLException;
import java.net.URI;
import java.net.URL;

@Path("/auth/login")
@RequiredArgsConstructor
public class LoginResource {

    private final AuthService authService;

    @POST
    @Path("/")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public LoginResponseBody login(
        @Valid LoginRequestBody body
    ) {
        URL callback = parseCallback(body.callback());
        String sessionToken = authService.initiateLogin(body.email(), callback);

        return new LoginResponseBody(sessionToken);
    }

    @POST
    @Path("/verify")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public VerifyResponseBody verify(
        @Valid VerifyRequestBody body
    ) {
        String jwt = authService.verifyLogin(body.sessionToken(), body.verificationCode());

        return new VerifyResponseBody(jwt);
    }

    private URL parseCallback(String callback) {
        try {
            if (callback == null) return null;
            return URI.create(callback).toURL();
        } catch (MalformedURLException ex) {
            throw new InvalidCallback(callback);
        }
    }

    public record LoginRequestBody(
        @Size(max = 511)
        @NotNull
        @NotEmpty
        String email,

        @Size(max = 1023)
        @org.hibernate.validator.constraints.URL
        String callback
    ) {
    }

    public record LoginResponseBody(
        String sessionToken
    ) {
    }

    public record VerifyRequestBody(
        @Size(max = 255)
        @NotNull
        @NotEmpty
        String sessionToken,

        @Size(max = 255)
        @NotNull
        @NotEmpty
        String verificationCode
    ) {
    }

    public record VerifyResponseBody(
        String jwt
    ) {
    }

}
