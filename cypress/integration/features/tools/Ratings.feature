Feature: Tools/Ratings

  Background:
    Given the current page is /tools/ratings

  Scenario: User enters a number of good reviews and the number of total reviews.
    When the user enters the following:
      | input field      | value |
      | #rating-total    | 120   |
      | #rating-positive | 70    |
    Then "#rating-percentage" has value "58.33"
    And "#rating-score" has value "58.20"

  Scenario: User enters a number of good reviews that is larger than the total number of reviews.
    When the user enters the following:
      | input field      | value |
      | #rating-total    | 50   |
      | #rating-positive | 70    |
    Then "#rating-positive" has value "50"
    And "#rating-percentage" has value "100.00"
    And "#rating-score" has value "98.08"
