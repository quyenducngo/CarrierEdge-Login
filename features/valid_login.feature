Feature: CarriersEdge Valid Login

  Scenario: Validate successful login given valid user
    Given I launch the Chrome browser
    When I navigate to the login page
    And I enter a valid username and password
    Then I should see dashboard page