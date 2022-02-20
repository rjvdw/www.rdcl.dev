Feature: Tools/DropRates

  Background:
    Given the current page is /tools/drop-rates

  Scenario: User enters a drop rate and a number of attempts.
    When the user enters the following:
      | input field | values |
      | #dropRate   | .25    |
      | #nrAttempts | 250    |
    Then "#chance" has value "46.52"
    And "#perc95" has value "1196"
    And "#perc99" has value "1840"

  Scenario: User clears the drop rate and number of attempts.
    When the user enters the following:
      | input field | values |
      | #dropRate   |        |
      | #nrAttempts |        |
    Then "#dropRate" has value ""
    And "#nrAttempts" has value ""
    And "#chance" has value "0"
    And "#perc95" has value ""
    And "#perc99" has value ""

  Scenario: User enters a zero value.
    When the user enters the following:
      | input field | values |
      | #dropRate   | 0      |
      | #nrAttempts | 100    |
    Then "#chance" has value "0.00"
    And "#perc95" has value ""
    And "#perc99" has value ""
