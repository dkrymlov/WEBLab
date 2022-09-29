var Chance = require('chance');

describe('Auth test', () => {

  const chance = new Chance();
  const email = chance.email()
  const password = '123123123'


  it('Signup', () => {
    cy.visit('http://localhost:4200/signup')
    cy.get("input[placeholder=\"Email\"]").type(email)
    cy.get("input[placeholder=\"Password\"]").type(password)
    cy.get("button").click()
    cy.get("app-login-page").should("exist")
  })

  it('Login', () => {
    cy.visit('http://localhost:4200/login')
    cy.get("input[placeholder=\"Email\"]").type(email)
    cy.get("input[placeholder=\"Password\"]").type(password)
    cy.get("button").click()
    cy.get("app-task-view").should("exist")
  })

  it('Logout', () => {
    cy.visit('http://localhost:4200/')
    cy.get('.login-block > div').eq(2).click()
    cy.get("h1").should("contain", "Login")
  })

})
