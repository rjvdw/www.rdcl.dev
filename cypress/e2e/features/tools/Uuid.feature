Feature: tools/UUID

  Background:
    Given the current page is /tools/uuid

  Scenario: User visits the /tools/uuid page.
    Then the page title is "uuid | tools | rdcl.dev"
    And uuid has no value

  Scenario: User generates a new UUID
    When the user clicks the button to generate a new UUID
    Then uuid has a value

  Scenario: User copies the UUID to their clipboard
    When the user clicks the button to generate a new UUID
    And the user clicks the button to copy the UUID to their clipboard
    Then the uuid is copied to the clipboard

  Scenario: User generates a new UUID and copies it to their clipboard
    When the user clicks the button to generate a new UUID and copy it to their clipboard
    Then uuid has a value
    And the uuid is copied to the clipboard
