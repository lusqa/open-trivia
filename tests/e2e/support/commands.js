// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("getQuestions", function() {
  cy.fixture("questions.json").then(({ results: questions }) => {
    const medium = questions.map(question => {
      return Object.assign({}, question, { difficulty: "medium" });
    });
    const hard = questions.map(question => {
      return Object.assign({}, question, { difficulty: "hard" });
    });
    cy.route("https://opentdb.com/api.php?amount=10&difficulty=easy**", {
      results: questions
    });
    cy.route("https://opentdb.com/api.php?amount=10&difficulty=medium**", {
      results: medium
    });
    cy.route("https://opentdb.com/api.php?amount=10&difficulty=hard**", {
      results: hard
    });
  });
});

Cypress.Commands.add("setReport", function(category) {
  localStorage.setItem(
    category,
    JSON.stringify({
      correctAnswers: { easy: 2, medium: 3, hard: 0 },
      incorrectAnswers: { easy: 2, medium: 3, hard: 0 }
    })
  );
});
