Feature: Tools/Countdown

  Background:
    Given the current page is /tools/countdown

  Scenario: User visits the /tools/countdown page.
    Then the page title is "countdown | tools | rdcl.dev"

  Scenario: User enters values that have a solution.
    When the user enters the numbers 100, 75, 7, 2, 5, 9
    And the user enters a target of 716
    And the user tries to find a solution
    Then the following solution is found:
      | operation | operand 1 | operand 2 | result |
      | *         | 100       | 7         | 700    |
      | *         | 75        | 5         | 375    |
      | /         | 700       | 2         | 350    |
      | -         | 375       | 9         | 366    |
      | +         | 350       | 366       | 716    |

  Scenario: User enters values that do not have a solution.
    When the user enters the numbers 1, 2, 3, 4, 5, 6
    And the user enters a target of 314
    And the user tries to find a solution
    Then no solution is found
