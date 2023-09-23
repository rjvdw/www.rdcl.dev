package dev.rdcl.www.server.auth.exceptions;

import java.net.URL;

public class InvalidCallback extends RuntimeException {

    public InvalidCallback(URL callback) {
        super("Invalid callback provided: %s".formatted(callback));
    }

    public InvalidCallback(String callback) {
        super("Invalid callback provided: %s".formatted(callback));
    }
}
