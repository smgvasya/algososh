describe("Все страницы доступны пользователю:", () => {
  it("домашняя страница", () => {
    cy.visit("http://localhost:3000/");
  });
  it("cтрока", () => {
    cy.visit("http://localhost:3000/recursion");
  });
  it("последовательность Фибоначи", () => {
    cy.visit("http://localhost:3000/fibonacci");
  });
  it("сортировка массива", () => {
    cy.visit("http://localhost:3000/sorting");
  });
  it("стек", () => {
    cy.visit("http://localhost:3000/stack");
  });
  it("очередь", () => {
    cy.visit("http://localhost:3000/queue");
  });
  it("связный список", () => {
    cy.visit("http://localhost:3000/list");
  });
});
