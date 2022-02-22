Feature: Navigation
  
  Scenario: When the user navigates to /tools, the app updates.
    Given the current page is /
    When the user clicks on 'rdcl-sidemenu-item[href="/tools"]'
    Then the page url is "/tools"
    And the page title is "tools | rdcl.dev"

  Scenario: When the user navigates to /tools and then to /tools/bmi, the app updates.
    Given the current page is /
    When the user clicks on 'rdcl-sidemenu-item[href="/tools"]'
    And the user clicks on 'rdcl-tool-link a[href="/tools/bmi"]'
    Then the page url is "/tools/bmi"
    And the page title is "bmi | tools | rdcl.dev"

  Scenario: When the user navigates to /tools, then to /tools/bmi and then back to /tools, the app updates.
    Given the current page is /
    When the user clicks on 'rdcl-sidemenu-item[href="/tools"]'
    And the user clicks on 'rdcl-tool-link a[href="/tools/bmi"]'
    And the user clicks on 'rdcl-sidemenu-item[href="/tools"]'
    Then the page url is "/tools"
    And the page title is "tools | rdcl.dev"

  Scenario: When the user navigates to /tools and then back to /, the app updates.
    Given the current page is /
    When the user clicks on 'rdcl-sidemenu-item[href="/tools"]'
    And the user clicks on 'rdcl-sidemenu-item[href="/"]'
    Then the page url is "/"
    And the page title is "rdcl.dev"
