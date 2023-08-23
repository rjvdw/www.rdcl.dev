Feature: Tools/DropRates

  Background:
    Given the current page is /tools/drop-rates

  Scenario: User visits the /tools/drop-rates page.
    Then the page title is "drop rates | tools | rdcl.dev"

  Scenario: User enters a drop rate and a number of attempts.
    When the user enters:
      | field       | value |
      | drop rate   | 0.25  |
      | nr attempts | 250   |
    Then the chance is "46.52"
    And the 95th percentile is "1196"
    And the 99th percentile is "1840"

  Scenario: User clears the drop rate and number of attempts.
    When the user enters:
      | field       | value |
      | drop rate   |       |
      | nr attempts |       |
    Then the drop rate is ""
    And the nr attempts is ""
    And the chance is ""
    And the 95th percentile is ""
    And the 99th percentile is ""

  Scenario: User enters a zero value.
    When the user enters:
      | field       | value |
      | drop rate   | 0     |
      | nr attempts | 100   |
    Then the chance is "0.00"
    And the 95th percentile is "∞"
    And the 99th percentile is "∞"
