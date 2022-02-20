Feature: Tools/BMI

  Background:
    Given the current page is /tools/bmi

  Scenario: User visits the /tools/bmi page.
    Then the page title is "bmi | tools | rdcl.dev"

  Scenario: User enters their weight and height.
    When the user enters the following:
      | input field | value |
      | #weight     | 75    |
      | #height     | 185   |
    Then "#bmi" has value "21.91"

  Scenario: User enters their height and BMI.
    When the user enters the following:
      | input field | value |
      | #height     | 185   |
      | #bmi        | 22    |
    Then "#weight" has value "75.3"

  Scenario: User clears the weight field.
    When the user enters the following:
      | input field | value |
      | #weight     |       |
    Then "#weight" has value ""
    And "#bmi" has value "0"

  Scenario: User clears the weight and the height field.
    When the user enters the following:
      | input field | value |
      | #weight     |       |
      | #height     |       |
    Then "#weight" has value ""
    And "#height" has value ""
    And "#bmi" has value ""

  Scenario: User refreshes the page after entering data.
    When the user enters the following:
      | input field | value |
      | #weight     | 60    |
      | #height     | 170   |
    And the user refreshes the page
    Then "#weight" has value "60"
    And "#height" has value "170"
