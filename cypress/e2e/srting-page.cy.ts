import { isDisabledButton, changingArr, modefiedArr, circleClass } from "../utils-cy/index";

describe("Тест для последовательности Фибоначи: ", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/recursion");
  });

  isDisabledButton();

  it("строка разворачивается корректно", () => {
    cy.get("input").type("test");
    cy.get("button").eq(1).click();

    cy.get(circleClass)
      .should("have.length", 4)
      .each((circle, index) => {
        cy.get(circle)
          .should("contain", changingArr[index].item)
          .and("have.css", "border", changingArr[index].state);
      });

    cy.get(circleClass).each((circle, index) => {
      cy.get(circle)
        .should("contain", modefiedArr[index].item)
        .and("have.css", "border", modefiedArr[index].state);
    });
  });
});
