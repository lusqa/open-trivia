describe("Categories", function() {
  beforeEach(function() {
    cy.server();
    cy.fixture("categories.list.json").as("categories");
    cy.route("**opentdb.com/api_category.php", "@categories");
  });

  it("When I click in a category card should go to the right page", function() {
    cy.visit("/");
  });
});
