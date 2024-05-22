import { LoginOperator } from '../support/page-operators/login.po';
import { setupMocks } from '../support/utils/auth.util';

describe('PetStore routing', () => {

  it('redirects to login page on initial visit to app root', () => {
    setupMocks();
    cy.visit('/');
    cy.url().should('contain', 'login');
    cy.findByLabelText(/Email/i);
  });

  it('redirects to pet-list page from app-root after logging in', () => {
    setupMocks();
    cy.visit('/')
    cy.url().should('contain', 'login')
    LoginOperator.login();
    cy.wait(['@userLogin', '@getPetsByStatus'])
    cy.findByRole('button', { name: /Add new pet/i});
    cy.visit('/')
    cy.url().should('contain', 'pet-list')
  })
});
