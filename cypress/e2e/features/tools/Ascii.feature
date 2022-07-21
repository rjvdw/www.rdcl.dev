Feature: Tools/ASCII

  Background:
    Given the current page is /tools/ascii

  Scenario: User visits the /tools/ascii page.
    Then the page title is "ascii | tools | rdcl.dev"

  Scenario: User enters text and converts it to binary.
    When the user chooses to convert to binary
    And the user enters "Some example text"
    Then the result is "01010011 01101111 01101101 01100101 00100000 01100101 01111000 01100001 01101101 01110000 01101100 01100101 00100000 01110100 01100101 01111000 01110100"

  Scenario: User enters text and converts it to decimal.
    When the user chooses to convert to decimal
    And the user enters "Some example text"
    Then the result is "83 111 109 101 32 101 120 97 109 112 108 101 32 116 101 120 116"

  Scenario: User enters text and converts it to hex.
    When the user chooses to convert to hex
    And the user enters "Some example text"
    Then the result is "53 6f 6d 65 20 65 78 61 6d 70 6c 65 20 74 65 78 74"
