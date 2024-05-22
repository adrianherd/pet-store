import { PetListOperator } from '../support/page-operators/pet-list.po';
import { setupMocks } from '../support/utils/auth.util';
import { LoginOperator } from '../support/page-operators/login.po';

describe('Pet List Page', () => {
  it('updates status of existing pet item', () => {
    setupMocks();
    cy.visit('/')
    LoginOperator.login();
    cy.wait(['@userLogin','@getPetsByStatus'])
    PetListOperator.updatePet('Lion 1', 'Lion 1', 'pending')
    cy.wait(['@updatePet']);

    // Change list view to pending to ensure lion is returned
    PetListOperator.changeStatusFilter('pending');
    cy.findByText('Lion 1').parent().findByText('pending');

    // Change list view to sold and ensure lion is not present
    PetListOperator.changeStatusFilter('sold');
    cy.findByText('Lion 1').should('not.exist');
  })

  it('updates name of existing pet item', () => {
    setupMocks();

    // Visit page and login
    cy.visit('/')
    LoginOperator.login();
    cy.wait(['@userLogin','@getPetsByStatus'])

    // Change a list item
    PetListOperator.updatePet('Lion 1', 'Lioness 1', 'sold')
    cy.wait(['@updatePet']);

    // Change list view to pending to ensure lion is returned
    PetListOperator.changeStatusFilter('pending');
    cy.findByText('Lioness 1').should('not.exist');

    // Change list view to sold and ensure lion is not present
    PetListOperator.changeStatusFilter('sold');
    cy.findByText('Lioness 1').parent().findByText('sold');
  })
})
