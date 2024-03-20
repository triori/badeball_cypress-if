Feature: QA Autotest

Background:
    Given I should check that base URL works

Scenario: Test task #1. Digits in the book titles.
    When open "/books" page
    Then I check that there are no numbers in the book titles

Scenario: Test task #2. Should click element if dropdown closed only.
    When open "/menu#" page
    Then I should click element if dropdown closed only

@focus
Scenario: Test task #3. Try to catch 98%.
    When open "/progress-bar" page
    And I hit Start button
    Then Try to catch 98% in the progressbar