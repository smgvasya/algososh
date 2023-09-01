import { isDisabledButton, changingArr, modefiedArr, circleClass } from "../utils-cy/index";

describe("Тест для последовательности Фибоначи: ", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/fibonacci");
  });

  isDisabledButton()

  it("числа генерируются корректно", () => {
    cy.get("input").type(19);
    cy.get("button").eq(1).click();
    cy.wait(10000);
    cy.get(circleClass)

      .should("have.length", 20)
      .each((circle, index) => {
        if (index === 0) cy.wrap(circle).contains(1);
        if (index === 1) cy.wrap(circle).contains(1);
        if (index === 2) cy.wrap(circle).contains(2);
        if (index === 3) cy.wrap(circle).contains(3);
        if (index === 4) cy.wrap(circle).contains(5);
        if (index === 5) cy.wrap(circle).contains(8);
        if (index === 6) cy.wrap(circle).contains(13);
        if (index === 7) cy.wrap(circle).contains(21);
        if (index === 8) cy.wrap(circle).contains(34);
        if (index === 9) cy.wrap(circle).contains(55);
        if (index === 10) cy.wrap(circle).contains(89);
        if (index === 11) cy.wrap(circle).contains(144);
        if (index === 12) cy.wrap(circle).contains(233);
        if (index === 13) cy.wrap(circle).contains(377);
        if (index === 14) cy.wrap(circle).contains(610);
        if (index === 15) cy.wrap(circle).contains(987);
        if (index === 16) cy.wrap(circle).contains(1597);
        if (index === 17) cy.wrap(circle).contains(2584);
        if (index === 18) cy.wrap(circle).contains(4181);
        if (index === 19) cy.wrap(circle).contains(6765);
      });
  });
});
