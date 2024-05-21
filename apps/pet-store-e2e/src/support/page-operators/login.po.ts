
export const LoginOperator = {
  login,
}

export function login() {
  cy.visit('/login')
  cy.get('input[name="email"]').type(Cypress.env('email'));
  cy.get('input[name="password"]').type(Cypress.env('password'));
  cy.get('button[type="submit"]').click();
}
