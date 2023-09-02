import {
  isDisabledButton,
  changingArr,
  modefiedArr,
  circleClass,
  addValue,
} from "../utils-cy/index";

describe("Тест для последовательности Фибоначи: ", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/recursion");
  });

  isDisabledButton();

  it("строка разворачивается корректно", () => {
    addValue("test", 1);

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
