describe('Lists test', () => {

  const OPERATIONS = 6

  beforeEach(() => {
    window.localStorage.setItem("x-access-token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzJkYmFkZjQzODdhMTg4ZmQ4MmU2M2MiLCJpYXQiOjE2NjQ0NDIyNDIsImV4cCI6MTY2NDQ3ODI0Mn0.OWTvepk-uasfP9MQ3S_30nu4uVoUgSwY4uSAolKkYa4")
  })

  it('Add lists', () => {
    for (let i = 0; i < OPERATIONS; i++){
      cy.visit('http://localhost:4200/todo/new-list')
      cy.get("input[placeholder=\"Title\"]").type(String(i+1))
      cy.get("button").click()
    }
    cy.get(".list-menu-item").should("have.length", OPERATIONS)
  })

  it('Update list', () => {
    let text = OPERATIONS
    for (let i = 0; i < OPERATIONS; i++){
      cy.get('.list-menu-item > p').eq(i).click()
      cy.get('.list-buttons > .edit-btn').eq(i).click()
      cy.get("input[placeholder=\"Title\"]").type(String(text--))
      cy.get("button").click()
    }
    cy.get(".list-menu-item > p:first").should("have.text", OPERATIONS)
  })

  it('Delete list', () => {
    for (let i = 0; i < OPERATIONS; i++){
      cy.visit('http://localhost:4200/todo/lists')
      cy.get('.list-menu-item > p:first').click()
      cy.get('.list-buttons > .delete-btn:first').click()
    }
    cy.get('.list-menu-item').should('not.exist')
  })


})
