describe("Categories", function() {
  beforeEach(function() {
    cy.server();
    cy.route("https://opentdb.com/api_category.php", "fx:categories.list").as(
      "getCategories"
    );
  });

  describe("When I click in a category card", function() {
    it("And I have not answered the category should go to the trivia page", function() {
      cy.visit("/");

      cy.contains("Mythology").click();

      cy.url().should("include", "/trivia/Mythology");
    });

    it("And I have answered the category should go to the report page", function() {
      cy.setReport("Mythology");
      cy.visit("/");

      cy.contains("Mythology").click();

      cy.url().should("include", "/report/Mythology");
    });
  });
});
