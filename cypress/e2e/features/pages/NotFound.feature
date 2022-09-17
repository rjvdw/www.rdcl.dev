Feature: Home Page

  Background:
    Given the current page is /some-invalid-url

  Scenario: User visits a page that does not exist
    Then the page title is "not found | rdcl.dev"
    And "main" matches:
    """
    <h1>Page not found</h1>
    <p>
      The page you were trying to reach does not exist.
    </p>
    """
