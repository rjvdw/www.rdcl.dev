package dev.rdcl.www.server.auth.events;

import java.net.URL;

public record EmailLoginStarted(String email, URL callback, String sessionToken) {
}
