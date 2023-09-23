package dev.rdcl.www.server.auth;

import io.smallrye.config.ConfigMapping;
import io.smallrye.config.WithDefault;

import java.net.URL;

@ConfigMapping(prefix = "api.auth")
public interface AuthProperties {

    int sessionTokenLength();

    int verificationCodeLength();

    @WithDefault("360" /* 6 minutes */)
    int maxLoginAttemptDurationSeconds();

    URL defaultLoginCallbackUrl();

    String verificationEmailFrom();
}
