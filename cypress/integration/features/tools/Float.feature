Feature: Tools/Float

  Background:
    Given the current page is /tools/float

  Scenario: User visits the /tools/drop-rates page.
    Then the page title is "float | tools | rdcl.dev"

  Scenario: User enters 10 and chooses single precision.
    When the user enters the following:
      | input field  | value |
      | #float-input | 10    |
    And the user clicks on "[name=float-type-input][value=32]"
    Then ".float-analysis" matches:
    """
    <tbody>
    <tr>
      <th>Input</th>
      <td>10</td>
    </tr>
    <tr>
      <th>Binary representation</th>
      <td>01000001 00100000 00000000 00000000</td>
    </tr>
    <tr>
      <th>Deconstructed</th>
      <td>
        <span class="sign">0</span><span class="exponent">1000001 0</span><span class="mantissa">0100000 00000000 00000000</span>
      </td>
    </tr>
    <tr>
      <th>Hex representation</th>
      <td>41 20 00 00</td>
    </tr>
    <tr>
      <th>Scientific notation</th>
      <td>1.25×2<sup>3</sup></td>
    </tr>
    </tbody>
    """

  Scenario: User enters -10 and chooses single precision.
    When the user enters the following:
      | input field  | value |
      | #float-input | -10   |
    And the user clicks on "[name=float-type-input][value=32]"
    Then ".float-analysis" matches:
    """
    <tbody>
    <tr>
      <th>Input</th>
      <td>-10</td>
    </tr>
    <tr>
      <th>Binary representation</th>
      <td>11000001 00100000 00000000 00000000</td>
    </tr>
    <tr>
      <th>Deconstructed</th>
      <td>
        <span class="sign">1</span><span class="exponent">1000001 0</span><span class="mantissa">0100000 00000000 00000000</span>
      </td>
    </tr>
    <tr>
      <th>Hex representation</th>
      <td>c1 20 00 00</td>
    </tr>
    <tr>
      <th>Scientific notation</th>
      <td>-1.25×2<sup>3</sup></td>
    </tr>
    </tbody>
    """

  Scenario: User enters 0.3 and chooses double precision.
    When the user enters the following:
      | input field  | value |
      | #float-input | 0.3   |
    And the user clicks on "[name=float-type-input][value=64]"
    Then ".float-analysis" matches:
    """
    <tbody>
    <tr>
      <th>Input</th>
      <td>0.3</td>
    </tr>
    <tr>
      <th>Binary representation</th>
      <td>00111111 11010011 00110011 00110011 00110011 00110011 00110011 00110011</td>
    </tr>
    <tr>
      <th>Deconstructed</th>
      <td>
        <span class="sign">0</span><span class="exponent">0111111 1101</span><span class="mantissa">0011 00110011 00110011 00110011 00110011 00110011 00110011</span>
      </td>
    </tr>
    <tr>
      <th>Hex representation</th>
      <td>3f d3 33 33 33 33 33 33</td>
    </tr>
    <tr>
      <th>Scientific notation</th>
      <td>1.2×2<sup>-2</sup></td>
    </tr>
    </tbody>
    """
