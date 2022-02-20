Feature: Tools Page

  Background:
    Given the current page is /tools

  Scenario: User visits the tools page.
    Then the page title is "tools | rdcl.dev"
    And "main > h1" matches "Tools"
    And the following tools are present:
      | tool                 | url               | description                                                                             |
      | Generate Password    | /password.html    | Securely generates a password using window.crypto                                       |
      | ASCII Converter      | /tools/ascii      | Converts between ASCII and plain text.                                                  |
      | Float Calculator     | /tools/float      | Calculator to help with floating point numbers.                                         |
      | Timestamp            | /tools/timestamp  | Convert between Unix timestamps and ISO formatted dates.                                |
      | HTML Elements        | /tools/html       | Demonstrations of assorted HTML elements.                                               |
      | Countdown            | /tools/countdown  | Solves the numbers game in Countdown.                                                   |
      | Drop Rate Calculator | /tools/drop-rates | Given a drop rate, computes how many attempts you actually need to get your item.       |
      | BMI Calculator       | /tools/bmi        | Body Mass Index calculator.                                                             |
      | How to read a rating | /tools/ratings    | Given how many reviews out of a total number of reviews are positive, computes a score. |
