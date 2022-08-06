Feature: Tools/MarkdownViewer

  Background:
    Given the current page is /tools/markdown-viewer

  Scenario: Use visits the /tools/markdown-viewer
    Then the page title is "markdown viewer | tools | rdcl.dev"

  Scenario: User uploads a markdown file
    When the user uploads "test-1.md" with mime-type "text/markdown"
    Then the file "test-1.md" is shown with contents:
      """
      <h1>Test 1</h1>
      <p>This is a <em>test</em> file.</p>
      """

  Scenario: User uploads multiple markdown files
    When the user uploads the following files:
      | file path | mime type     |
      | test-1.md | text/markdown |
      | test-2.md | text/markdown |
    Then the file "test-1.md" is shown with contents:
      """
      <h1>Test 1</h1>
      <p>This is a <em>test</em> file.</p>
      """
    And the file "test-2.md" is shown with contents:
      """
      <h1>Test 2</h1>
      <p>This is a <em>test</em> file.</p>
      """

  Scenario: User uploads an invalid file
    When the user uploads "test-1.md" with mime-type "text/invalid"
    Then the file "test-1.md" is shown with the error message "Invalid file type: text/invalid"
