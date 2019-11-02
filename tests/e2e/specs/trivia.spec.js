describe("Trivia", function() {
  beforeEach(function() {
    cy.server();
    cy.route("https://opentdb.com/api_category.php", "fx:categories.list").as(
      "getCategories"
    );
    cy.getQuestions();
  });

  describe("When I click in a category card", function() {
    it("And I got 5 questions should navigate to the report page informing it", function() {
      cy.visit("/");

      cy.contains("Mythology").click();

      cy.url().should("include", "/trivia/Mythology");

      for (let i = 0; i < 10; i++) {
        if (i % 2 === 0) {
          cy.contains("Correct Answer").click();
        } else {
          cy.contains("Incorrect Answer").click();
        }
        cy.get("#answerButton").click();

        cy.get("#feedbackDialogNextButton").click();
      }

      cy.url().should("include", "/report/Mythology");

      cy.get("#totalCorrectAnswersNumber").should("contains.text", 5);
      cy.get("#totalIncorrectAnswersNumber").should("contains.text", 5);
    });

    it("And I miss 2 questions in sequence should decrease the difficulty", function() {
      cy.visit("/");

      cy.contains("Mythology").click();

      for (let i = 0; i < 2; i++) {
        cy.get("#questionDifficulty").should("contains.text", "medium");
        cy.contains("Incorrect Answer").click();
        cy.get("#answerButton").click();
        cy.get("#feedbackDialogNextButton").click();
      }

      cy.get("#questionDifficulty").should("contains.text", "easy");
    });

    it("And I got 2 questions in sequence should increase the difficulty", function() {
      cy.visit("/");

      cy.contains("Mythology").click();

      for (let i = 0; i < 2; i++) {
        cy.get("#questionDifficulty").should("contains.text", "medium");
        cy.contains("Correct Answer").click();
        cy.get("#answerButton").click();
        cy.get("#feedbackDialogNextButton").click();
      }

      cy.get("#questionDifficulty").should("contains.text", "hard");
    });
  });
});
