
export const LoginOperator = {
  login,
}

export function login() {
  cy.findByRole('textbox', { name: /email/i }).type('abc');
  cy.findByRole('button').click();
}
