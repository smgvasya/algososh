import {
  circleClass,
  circleContent,
  circle,
  circleChanging,
  defaultCircle,
  circleAddIndex,
  circleAddTail,
  circleAddHead,
  circleRemoveHead,
  circleRemoveTail,
  circleRemoveIndex,
  circleAddValue,
  circleAddValueIndex,
} from "../utils-cy/index";

import {
  SHORT_DELAY_IN_MS,
  DELAY_IN_MS,
} from "../../src/utils/constants/delays";

describe("Cвязный список: ", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/list");
  });

  it("кнопки добавления недоступны, при пустых инпутах", () => {
    cy.get("input").each((input) => {
      cy.get(input).should("be.empty");
    });
    cy.get(circleAddHead).should("be.disabled");
    cy.get(circleAddTail).should("be.disabled");
    cy.get(circleAddIndex).should("be.disabled");
    cy.get(circleRemoveIndex).should("be.disabled");
  });

  it("отрисовка дефолтного списка", () => {
    cy.get(circleContent)
      .should("have.length", 4)
      .and("have.length.at.most", 6);
  });

  it("добавление элемента в head", () => {
    cy.get(circleAddValue).type("head");
    cy.get(circleAddHead).should("be.enabled").click();

    cy.get(circleContent)
      .should("have.length", 5)
      .each((circle, index) => {
        if (index === 0) cy.wrap(circle).find(circleChanging);
        if (index === 0) cy.wrap(circle).contains("head");
        if (index === 0) cy.wrap(circle).contains("head");
      });
    cy.get(circleClass).should("have.css", "border", defaultCircle);
  });

  it("добавление элемента в tail", () => {
    cy.get(circleAddValue).type("tail");
    cy.get(circleAddTail).should("be.enabled").click();

    cy.get(circleContent)
      .should("have.length", 5)
      .each((circle, index) => {
        if (index === 5) cy.wrap(circle).find(circleChanging);
        if (index === 5) cy.wrap(circle).contains("tail");
        if (index === 5) cy.wrap(circle).contains("tail");
      });
    cy.get(circleClass).should("have.css", "border", defaultCircle);
  });

  it("добавление элемента по индексу", () => {
    cy.get(circleAddValue).type("ind");
    cy.get(circleAddValueIndex).type("2");
    cy.get(circleAddIndex).should("be.enabled").click();

    cy.wait(DELAY_IN_MS);

    cy.get(circleContent)
      .should("have.length", 5)
      .each((circle, index) => {
        if (index === 2) cy.wrap(circle).contains("ind");
      });
    cy.get(circleClass).should("have.css", "border", defaultCircle);
  });

  it("удаление элемента из head", () => {
    for (let i = 3; i >= 0; i--) {
      cy.wait(SHORT_DELAY_IN_MS);
      cy.get(circleRemoveHead).click();
    }
    cy.get(circle).should("have.length", 0);
  });

  it("удаление элемента из tail", () => {
    for (let i = 3; i >= 0; i--) {
      cy.wait(SHORT_DELAY_IN_MS);
      cy.get(circleRemoveTail).click();
    }
    cy.get(circle).should("have.length", 0);
  });

  it("удаления элемента по индексу", () => {
    cy.get(circleAddValueIndex).type("3");
    cy.get(circleRemoveIndex).should("be.enabled").click();

    cy.get(circleContent).should("have.length", 3);
  });
});
