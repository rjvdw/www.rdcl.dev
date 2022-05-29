Feature: Tools/Float

  Background:
    Given the current page is /tools/float

  Scenario: User visits the /tools/drop-rates page.
    Then the page title is "float | tools | rdcl.dev"

  Scenario: User enters 10 and chooses single precision.
    When the user enters 10
    And the user chooses single precision
    Then the analysis shows the following:
      | field               | value                               |
      | input               | 10                                  |
      | binary              | 01000001 00100000 00000000 00000000 |
      | sign                | 0                                   |
      | exponent            | 1000001 0                           |
      | mantissa            | 0100000 00000000 00000000           |
      | hex                 | 41 20 00 00                         |
      | scientific notation | 1.25*2^3                            |

  Scenario: User enters -10 and chooses single precision.
    When the user enters -10
    And the user chooses single precision
    Then the analysis shows the following:
      | field               | value                               |
      | input               | -10                                 |
      | binary              | 11000001 00100000 00000000 00000000 |
      | sign                | 1                                   |
      | exponent            | 1000001 0                           |
      | mantissa            | 0100000 00000000 00000000           |
      | hex                 | c1 20 00 00                         |
      | scientific notation | -1.25*2^3                           |

  Scenario: User enters 0.3 and chooses double precision.
    When the user enters 0.3
    And the user chooses double precision
    Then the analysis shows the following:
      | field               | value                                                                   |
      | input               | 0.3                                                                     |
      | binary              | 00111111 11010011 00110011 00110011 00110011 00110011 00110011 00110011 |
      | sign                | 0                                                                       |
      | exponent            | 0111111 1101                                                            |
      | mantissa            | 0011 00110011 00110011 00110011 00110011 00110011 00110011              |
      | hex                 | 3f d3 33 33 33 33 33 33                                                 |
      | scientific notation | 1.2*2^-2                                                                |
