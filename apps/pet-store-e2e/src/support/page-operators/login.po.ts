
export const LoginOperator = {
  login,
}

export function login() {
  cy.findByLabelText(/Email/i).type('abc');
  cy.findByLabelText(/Password/i).type('123');
  cy.findByRole('button').click();
}
