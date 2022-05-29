Feature: Tools/DropRates

  Background:
    Given the current page is /tools/drop-rates

  Scenario: User visits the /tools/drop-rates page.
    Then the page title is "drop rates | tools | rdcl.dev"

  Scenario: User enters a drop rate and a number of attempts.
    When the user enters the following:
      | input field                | values |
      | [data-testid="dropRate"]   | .25    |
      | [data-testid="nrAttempts"] | 250    |
    Then "[data-testid="chance"]" has value "46.52"
    And "[data-testid="perc95"]" has value "1196"
    And "[data-testid="perc99"]" has value "1840"

  Scenario: User clears the drop rate and number of attempts.
    When the user enters the following:
      | input field                | values |
      | [data-testid="dropRate"]   |        |
      | [data-testid="nrAttempts"] |        |
    Then "[data-testid="dropRate"]" has value ""
    And "[data-testid="nrAttempts"]" has value ""
    And "[data-testid="chance"]" has value "0"
    And "[data-testid="perc95"]" has value ""
    And "[data-testid="perc99"]" has value ""

  Scenario: User enters a zero value.
    When the user enters the following:
      | input field                | values |
      | [data-testid="dropRate"]   | 0      |
      | [data-testid="nrAttempts"] | 100    |
    Then "[data-testid="chance"]" has value "0.00"
    And "[data-testid="perc95"]" has value ""
    And "[data-testid="perc99"]" has value ""
