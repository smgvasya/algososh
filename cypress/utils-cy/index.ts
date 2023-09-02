export const defaultCircle = "4px solid rgb(0, 50, 255)";
export const changingCircle = "4px solid rgb(210, 82, 225)";
export const modefiedCircle = "4px solid rgb(127, 224, 81)";
export const initArr = [210, 82, 225];

export const changingArr = [
  { item: "t", state: modefiedCircle },
  { item: "e", state: changingCircle },
  { item: "s", state: changingCircle },
  { item: "t", state: modefiedCircle },
];

export const modefiedArr = [
  { item: "t", state: modefiedCircle },
  { item: "s", state: modefiedCircle },
  { item: "e", state: modefiedCircle },
  { item: "t", state: modefiedCircle },
];

export const isDisabledButton = () => {
  it("кнопка добавления недоступна, при пустом инпуте", () => {
    cy.get("button").eq(1).should("be.disabled");
  });
};

export const addValue = (type: string | number, eq: number) => {
  cy.get("input").type(type);
  cy.get("button").eq(eq).click();
};

export const circleClass = "[class*=circle_circle]";
export const circle = '[data-cypress="circle"]';
export const circleContent = "[class*=circle_content]";
export const circleChanging = "[class*=circle_changing]";
export const circleDefault = "[class*=circle_default]";

export const circleRemove = '[data-cy="remove"]';
export const circleClear = '[data-cy="clear"]';

export const circleRemoveIndex = '[data-cy="removeIndex"]';
export const circleRemoveTail = '[data-cy="removeTail"]';
export const circleRemoveHead = '[data-cy="removeHead"]';

export const circleAddHead = '[data-cy="addHead"]';
export const circleAddTail = '[data-cy="addTail"]';
export const circleAddIndex = '[data-cy="addIndex"]';

export const circleAddValue = '[data-cy="value"]';
export const circleAddValueIndex = '[data-cy="valueIndex"]';

export const circleBorderSelector = '[data-cy="circle-color"]';
