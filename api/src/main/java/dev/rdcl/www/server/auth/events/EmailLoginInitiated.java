package dev.rdcl.www.server.auth.events;

public sealed interface EmailLoginInitiated
    permits LoginEmailSent, EmailLoginFailed {

    String email();

    String reason();

    static EmailLoginInitiated initiated(String email) {
        return new LoginEmailSent(email);
    }

    static EmailLoginInitiated failed(String email, String reason) {
        return new EmailLoginFailed(email, reason);
    }
}

record LoginEmailSent(String email) implements EmailLoginInitiated {

    @Override
    public String reason() {
        return null;
    }
}

record EmailLoginFailed(String email, String reason) implements EmailLoginInitiated {
}
