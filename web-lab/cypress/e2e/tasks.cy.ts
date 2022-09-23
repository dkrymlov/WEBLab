describe('empty spec', () => {

  const OPERATIONS = 6

  beforeEach(() => {
    window.localStorage.setItem("x-access-token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzJkYmFkZjQzODdhMTg4ZmQ4MmU2M2MiLCJpYXQiOjE2NjM5NDE4ODcsImV4cCI6MTY2Mzk3Nzg4N30.qfjL2TJjNpv0VJD6tF_M4GPsK_wNBCTceP2s6KQdwLs")
  })

  it('Add list', () => {
      cy.wait(100)
      cy.visit('http://localhost:4200/todo/new-list')
      cy.get("input[placeholder=\"Title\"]").type("1")
      cy.get("button").click()
      cy.get(".list-menu-item").should("have.length", 1)
  })

  it('Add tasks to list', () => {
    cy.wait(100)
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
    cy.wait(100)
    for (let i = 0; i < OPERATIONS; i++){
      cy.get('.task-menu-item').eq(i).click()
    }
  })

  it('Uncomplete tasks in list', () => {
    cy.wait(100)
    for (let i = 0; i < OPERATIONS; i++){
      cy.get('.task-menu-item').eq(i).click()
    }
  })

  it('Update tasks in list', () => {
    let text = OPERATIONS
    for (let i = 0; i < OPERATIONS; i++){
      cy.wait(100)
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
      cy.wait(200)
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
