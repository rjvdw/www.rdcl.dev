Feature: Tools/Ratings

  Background:
    Given the current page is /tools/ratings

  Scenario: User enters a number of good reviews and the number of total reviews.
    When the user enters the following:
      | input field                     | value |
      | [data-testid="rating-total"]    | 120   |
      | [data-testid="rating-positive"] | 70    |
    Then "[data-testid="rating-percentage"]" has value "58.33"
    And "[data-testid="rating-score"]" has value "58.20"

  Scenario: User enters a number of good reviews that is larger than the total number of reviews.
    When the user enters the following:
      | input field                     | value |
      | [data-testid="rating-total"]    | 50    |
      | [data-testid="rating-positive"] | 70    |
    Then "[data-testid="rating-positive"]" has value "50"
    And "[data-testid="rating-percentage"]" has value "100.00"
    And "[data-testid="rating-score"]" has value "98.08"
