package dev.rdcl.www.server.auth.exceptions;

import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;

@Provider
public class LoginAttemptNotFoundMapper implements ExceptionMapper<LoginAttemptNotFound> {
    @Override
    public Response toResponse(LoginAttemptNotFound exception) {
        return Response
            .status(Response.Status.NOT_FOUND)
            .entity(exception.getMessage())
            .build();
    }
}
