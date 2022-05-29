Feature: Tools/Countdown

  Background:
    Given the current page is /tools/countdown

  Scenario: User visits the /tools/countdown page.
    Then the page title is "countdown | tools | rdcl.dev"

  Scenario: User enters values that have a solution.
    When the user enters the following:
      | input field                   | value |
      | [data-testid="cd-inp-1"]      | 100   |
      | [data-testid="cd-inp-2"]      | 75    |
      | [data-testid="cd-inp-3"]      | 7     |
      | [data-testid="cd-inp-4"]      | 2     |
      | [data-testid="cd-inp-5"]      | 5     |
      | [data-testid="cd-inp-6"]      | 9     |
      | [data-testid="cd-inp-target"] | 716   |
    And the user clicks on "main > form button"
    Then "[data-testid="cd-solution"]" matches:
    """
    <h2>Solution</h2>
    <ul>
      <li>multiply(100, 7) → 700</li>
      <li>multiply(75, 5) → 375</li>
      <li>divide(2, 700) → 350</li>
      <li>subtract(9, 375) → 366</li>
      <li>add(350, 366) → 716</li>
    </ul>
    """

  Scenario: User enters values that do not have a solution.
    When the user enters the following:
      | input field                   | value |
      | [data-testid="cd-inp-1"]      | 1     |
      | [data-testid="cd-inp-2"]      | 2     |
      | [data-testid="cd-inp-3"]      | 3     |
      | [data-testid="cd-inp-4"]      | 4     |
      | [data-testid="cd-inp-5"]      | 5     |
      | [data-testid="cd-inp-6"]      | 6     |
      | [data-testid="cd-inp-target"] | 314   |
    And the user clicks on "main > form button"
    Then "[data-testid="cd-solution"]" matches:
    """
    <h2>Solution</h2>
    <p>This one is not possible</p>
    """
