Feature: Navigation
  
  Scenario: When the user navigates to /tools, the app updates.
    Given the current page is /
    When the user navigates to the tools page
    Then the page url is "/tools"
    And the page title is "tools | rdcl.dev"

  Scenario: When the user navigates to /tools/drop-rates, the app updates.
    Given the current page is /
    When the user navigates to the drop rates tool
    Then the page url is "/tools/drop-rates"
    And the page title is "drop rates | tools | rdcl.dev"

  Scenario: When the user navigates to /tools, then to /tools/drop-rates and then back to /tools, the app updates.
    Given the current page is /
    When the user navigates to the tools page
    And the user navigates to the drop rates tool
    And the user navigates to the tools page
    Then the page url is "/tools"
    And the page title is "tools | rdcl.dev"

  Scenario: When the user navigates to /tools and then back to /, the app updates.
    Given the current page is /
    When the user navigates to the tools page
    And the user navigates to the home page
    Then the page url is "/"
    And the page title is "rdcl.dev"
