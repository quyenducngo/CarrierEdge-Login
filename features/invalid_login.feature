Feature: CarriersEdge Invalid Login

  Scenario: Validate failed login given invalid user
    Given I launch the Chrome browser
    When I navigate to the login page
    And I enter an invalid username and password
    Then I should see a login error message