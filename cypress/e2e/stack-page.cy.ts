import {
  isDisabledButton,
  circleContent,
  circle,
  circleChanging,
  circleDefault,
} from "../utils-cy/index";

describe("Тест для последовательности Фибоначи: ", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/stack");
  });

  isDisabledButton();

  it("добавление элемента в стек", () => {
    cy.get("input").clear();
    cy.get("input").type(1);
    cy.get("button").eq(1).click();

    cy.get(circleContent)
      .should("have.length", 1)
      .each((el, index) => {
        if (index === 0) cy.wrap(el).find(circleChanging);
      });

    cy.get(circleContent)
      .should("have.length", 1)
      .each((el, index) => {
        if (index === 0) cy.wrap(el).find(circleDefault);
      });

    cy.get("input").type(2);
    cy.get("button").eq(1).click();

    cy.get(circleContent)
      .should("have.length", 2)
      .each((el, index) => {
        if (index === 0) cy.wrap(el).find(circleDefault);
        if (index === 1) cy.wrap(el).find(circleChanging);
      });

    cy.get(circleContent)
      .should("have.length", 2)
      .each((el, index) => {
        if (index === 0 || index === 1) cy.wrap(el).find(circleDefault);
      });
  });

  it("удаление элемента из стека", () => {
    for (let i = 0; i < 4; i++) {
      cy.get("input").type(`${i}`);
      cy.get("button").eq(1).click();
      cy.wait(500);
    }
    for (let i = 3; i >= 0; i--) {
      cy.wait(500);
      cy.get('[data-cy="remove"]').click();
    }
  });

  it("поведение кнопки «Очистить»", () => {
    for (let i = 0; i < 8; i++) {
      cy.get("input").type(`${i}`);
      cy.get("button").eq(1).click();
      i++;
      cy.wait(500);
    }

    cy.get('[data-cy="clear"]').click();
    cy.get(circle).should("have.length", 0);
  });
});
