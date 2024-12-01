Feature: Search for a place

  Scenario: Search for a place by name
    Given I am on the home page
    When I search for "London"
    And I click on the search button
    Then I should see the search results of "London"