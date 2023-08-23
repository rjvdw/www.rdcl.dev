Feature: Tools Page

  Background:
    Given the current page is /tools

  Scenario: User visits the tools page.
    Then the page title is "tools | rdcl.dev"
    And the main title matches "Tools"
    And the following tools are present:
      | tool                 | url                    | description                                                                             |
      | Generate Password    | /password.html         | Securely generates a password using window.crypto                                       |
      | Countdown            | /tools/countdown       | Solves the numbers game in Countdown.                                                   |
      | Drop Rate Calculator | /tools/drop-rates      | Given a drop rate, computes how many attempts you actually need to get your item.       |
      | My IP                | /tools/ip              | Show your current IPv4 and IPv6 addresses.                                                                                        |
