Feature: Tools/BMI

  Background:
    Given the current page is /tools/bmi

  Scenario: User visits the /tools/bmi page.
    Then the page title is "bmi | tools | rdcl.dev"

  Scenario: User enters their weight and height.
    When the user enters the following:
      | input field            | value |
      | [data-testid="weight"] | 75    |
      | [data-testid="height"] | 185   |
    Then "[data-testid="bmi"]" has value "21.91"

  Scenario: User enters their height and BMI.
    When the user enters the following:
      | input field            | value |
      | [data-testid="height"] | 185   |
      | [data-testid="bmi"]    | 22    |
    Then "[data-testid="weight"]" has value "75.3"

  Scenario: User clears the weight field.
    When the user enters the following:
      | input field            | value |
      | [data-testid="weight"] |       |
    Then "[data-testid="weight"]" has value ""
    And "[data-testid="bmi"]" has value "0"

  Scenario: User clears the weight and the height field.
    When the user enters the following:
      | input field            | value |
      | [data-testid="weight"] |       |
      | [data-testid="height"] |       |
    Then "[data-testid="weight"]" has value ""
    And "[data-testid="height"]" has value ""
    And "[data-testid="bmi"]" has value ""

  Scenario: User refreshes the page after entering data.
    When the user enters the following:
      | input field            | value |
      | [data-testid="weight"] | 60    |
      | [data-testid="height"] | 170   |
    And the user refreshes the page
    Then "[data-testid="weight"]" has value "60"
    And "[data-testid="height"]" has value "170"
