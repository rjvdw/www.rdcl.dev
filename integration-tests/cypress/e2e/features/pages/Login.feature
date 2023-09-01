Feature: Login

  Background:
    Given the current page is /login

  Scenario: User vists the login page.
    Then the page title is "login | rdcl.dev"
    And the main content matches:
    """
    <h1>Login</h1>
    <form data-testid="login:form">
      <section class="form-grid">
        <label for="login:user">User</label>
        <input id="login:user" data-testid="login:user" type="text" name="user" autocomplete="user" required="">
        <button data-start="2">Log in</button>
        <label data-start="2"><input type="checkbox" name="remember-me"> Remember me</label>
      </section>
    </form>
    """

  Scenario: User starts logging in using e-mail authentication.
    Given a user with e-mail authentication
    When the user logs in
    Then the main content matches:
    """
    <h1>Login</h1>
    <p>Login request sent successfully, please wait for an e-mail.</p>
    """

  Scenario: User finishes logging in using e-mail authentication.
    Given a user that previously started e-mail authentication
    When the user finishes logging in
    Then the user is logged in

  Scenario: User starts logging in using passkey authentication.
    Given a user with passkey authentication
    When the user logs in with a valid passkey
    And the user finishes logging in
    Then the user is logged in

  Scenario: User starts logging in using passkey authentication, but aborts their attempt.
    Given a user with passkey authentication
    When the user logs in with a valid passkey
    And the user does not finish logging in
    Then the user is not logged in
