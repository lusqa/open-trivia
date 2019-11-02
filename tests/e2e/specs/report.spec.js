describe("Categories", function() {
  beforeEach(function() {
    cy.server();
    cy.route("https://opentdb.com/api_category.php", "fx:categories.list").as(
      "getCategories"
    );
  });

  describe("When I've answered a category and I navigate to the report page", function() {
    it("Should show the correct information", function() {
      cy.setReport("Mythology");

      cy.visit("/");

      cy.contains("Mythology").click();

      cy.url().should("include", "/report/Mythology");

      cy.get("#totalCorrectAnswersNumber").should("contains.text", "5");
      cy.get("#totalIncorrectAnswersNumber").should("contains.text", "5");

      cy.get("#correctAnswersEasy").should("contains.text", "2");
      cy.get("#incorrectAnswersEasy").should("contains.text", "2");

      cy.get("#correctAnswersMedium").should("contains.text", "3");
      cy.get("#incorrectAnswersMedium").should("contains.text", "3");

      cy.get("#correctAnswersHard").should("contains.text", "0");
      cy.get("#incorrectAnswersHard").should("contains.text", "0");
    });
  });
});
