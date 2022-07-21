Feature: Tools/Ratings

  Background:
    Given the current page is /tools/ratings

  Scenario: User enters a number of good reviews and the number of total reviews.
    When the user enters:
      | input field           | value |
      | total                 | 120   |
      | positive review count | 70    |
    Then the percentage is "58.33"
    And the score is "58.20"

  Scenario: User enters a number of good reviews that is larger than the total number of reviews.
    When the user enters:
      | input field           | value |
      | total                 | 50    |
      | positive review count | 70    |
    Then the positive review count is "50"
    And the percentage is "100.00"
    And the score is "98.08"
