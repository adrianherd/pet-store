
describe('pet-store-e2e', () => {

  it('redirects to login page on first visit to app root', () => {
    cy.visit('/');
    cy.url().should('contain', '/login');
    cy.get('input[name="email"]');
    cy.get('input[name="password"]');
  });
});
