import {
  isDisabledButton,
  circleContent,
  circle,
  circleChanging,
  circleDefault,
  addValue,
  circleRemove,
  circleClear,
} from "../utils-cy/index";
import { SHORT_DELAY_IN_MS } from "../../src/utils/constants/delays";

describe("Тест для последовательности Фибоначи: ", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/stack");
  });

  isDisabledButton();

  it("добавление элемента в стек", () => {
    addValue(1, 1);

    cy.get(circleContent)
      .should("have.length", 1)
      .each((circle, index) => {
        if (index === 0) cy.wrap(circle).find(circleChanging);
      });

    cy.get(circleContent)
      .should("have.length", 1)
      .each((circle, index) => {
        if (index === 0) cy.wrap(circle).find(circleDefault);
      });

    addValue(2, 1);

    cy.get(circleContent)
      .should("have.length", 2)
      .each((circle, index) => {
        if (index === 0) cy.wrap(circle).find(circleDefault);
        if (index === 1) cy.wrap(circle).find(circleChanging);
      });

    cy.get(circleContent)
      .should("have.length", 2)
      .each((circle, index) => {
        if (index === 0 || index === 1) cy.wrap(circle).find(circleDefault);
      });
  });

  it("удаление элемента из стека", () => {
    for (let i = 0; i < 4; i++) {
      addValue(`${i}`, 1);
      cy.wait(SHORT_DELAY_IN_MS);
    }
    for (let i = 3; i >= 0; i--) {
      cy.wait(SHORT_DELAY_IN_MS);
      cy.get(circleRemove).click();
    }
  });

  it("поведение кнопки «Очистить»", () => {
    for (let i = 0; i < 8; i++) {
      addValue(`${i}`, 1);
      cy.wait(SHORT_DELAY_IN_MS);
    }

    cy.get(circleClear).click();
    cy.get(circle).should("have.length", 0);
  });
});
