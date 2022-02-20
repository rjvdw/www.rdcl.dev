Feature: Home Page

  Background:
    Given the current page is /

  Scenario: User visits the home page.
    Then "main" matches:
    """
    <h1>rdcl.dev</h1>
    <p>
      Welcome to this page.
      I use this website to dump random stuff.
      <a href="https://www.ruud.online">You can find my homepage here</a>.
    </p>
    """
