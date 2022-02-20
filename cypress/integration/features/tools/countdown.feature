Feature: Tools/Countdown

  Background:
    Given the current page is /tools/countdown

  Scenario: User enters values that have a solution.
    When the user enters the following:
      | input field    | value |
      | #cd-inp-1      | 100   |
      | #cd-inp-2      | 75    |
      | #cd-inp-3      | 7     |
      | #cd-inp-4      | 2     |
      | #cd-inp-5      | 5     |
      | #cd-inp-6      | 9     |
      | #cd-inp-target | 716   |
    And the user clicks on "main > form button"
    Then "#cd-solution" matches:
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
      | input field    | value |
      | #cd-inp-1      | 1     |
      | #cd-inp-2      | 2     |
      | #cd-inp-3      | 3     |
      | #cd-inp-4      | 4     |
      | #cd-inp-5      | 5     |
      | #cd-inp-6      | 6     |
      | #cd-inp-target | 314   |
    And the user clicks on "main > form button"
    Then "#cd-solution" matches:
      """
      <h2>Solution</h2>
      <p>This one is not possible</p>
      """
