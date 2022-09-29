describe('empty spec', () => {

  const OPERATIONS = 6

  beforeEach(() => {
    window.localStorage.setItem("x-access-token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzJkYmFkZjQzODdhMTg4ZmQ4MmU2M2MiLCJpYXQiOjE2NjQ0NDIyNDIsImV4cCI6MTY2NDQ3ODI0Mn0.OWTvepk-uasfP9MQ3S_30nu4uVoUgSwY4uSAolKkYa4")
  })

  it('Add list', () => {
      cy.visit('http://localhost:4200/todo/new-list')
      cy.get("input[placeholder=\"Title\"]").type("1")
      cy.get("button").click()
      cy.get(".list-menu-item").should("have.length", 1)
  })

  it('Add tasks to list', () => {
    cy.visit('http://localhost:4200/todo/lists')
    cy.get('.list-menu-item > p:first').click()
    for (let i = 0; i < OPERATIONS; i++){
      cy.get("button").eq(1).click()
      cy.get("input[placeholder=\"Title\"]").type(String(i+1))
      cy.get("button").click()
    }
    cy.get(".task-menu-item").should("have.length", OPERATIONS)
  })

  it('Complete tasks in list', () => {
    for (let i = 0; i < OPERATIONS; i++){
      cy.get('.task-menu-item').eq(i).click()
    }
  })

  it('Uncomplete tasks in list', () => {
    for (let i = 0; i < OPERATIONS; i++){
      cy.get('.task-menu-item').eq(i).click()
    }
  })

  it('Update tasks in list', () => {
    let text = OPERATIONS
    for (let i = 0; i < OPERATIONS; i++){
      cy.get('.list-menu-item > p:first').click()
      cy.get('.task-buttons > .edit-btn').eq(i).click()
      cy.get("input[placeholder=\"Title\"]").type(String(text--))
      cy.get("button").click()
    }
    cy.get('.list-menu-item > p:first').click()
    cy.get(".task-menu-item > div:first").should("have.text", OPERATIONS)
  })

  it('Delete tasks in list', () => {
    cy.get('.list-menu-item > p:first').click()
    for (let i = 0; i < OPERATIONS; i++){
      cy.wait(150)
      cy.get('.task-buttons > .delete-btn:first').click()
    }
    cy.get(".list-menu-item > p:first").should("not.exist")
  })

  it('Delete list', () => {
    cy.visit('http://localhost:4200/todo/lists')
    cy.get('.list-menu-item > p:first').click()
    cy.get('.list-buttons > .delete-btn:first').click()
    cy.get('.list-menu-item').should('not.exist')
  })

})
