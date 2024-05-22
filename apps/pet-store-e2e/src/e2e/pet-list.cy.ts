import { PetListOperator } from '../support/page-operators/pet-list.po';
import { setupMocks } from '../support/utils/auth.util';
import { LoginOperator } from '../support/page-operators/login.po';

function setup() {
  // Isolate tests by stubbing localhost:8080 network calls
  setupMocks();

  // Visit page and login
  cy.visit('/')
  LoginOperator.login();
  cy.wait(['@userLogin','@getPetsByStatus'])
}

describe('Pet List Page', () => {
  it('updates status of existing pet item', () => {
    setup();

    // Update the status of Lion 1
    PetListOperator.updatePet('Lion 1', 'Lion 1', 'pending')
    cy.wait(['@updatePet']);

    // Change list view to pending to ensure lion is present
    PetListOperator.changeStatusFilter('pending');
    cy.wait(['@getPetsByStatus']);
    cy.findByText('Lion 1').parent().findByText('pending');

    // Change list view to sold and ensure lion is not present
    PetListOperator.changeStatusFilter('sold');
    cy.wait(['@getPetsByStatus']);
    cy.findByText('Lion 1').should('not.exist');
  })

  it('updates name of existing pet item', () => {
    setup();

    // Update the name of Lion 1
    PetListOperator.updatePet('Lion 1', 'Lioness 1', 'sold')
    cy.wait(['@updatePet']);

    // Change list view to pending to ensure lion is returned
    PetListOperator.changeStatusFilter('pending');
    cy.findByText('Lioness 1').should('not.exist');
    cy.wait(['@getPetsByStatus']);

    // Change list view to sold and ensure lion is not present
    PetListOperator.changeStatusFilter('sold');
    cy.wait(['@getPetsByStatus']);
    cy.findByText('Lioness 1').parent().findByText('sold');
  })

  it('successfully cancels a form updating pet item', () => {
    // Isolate tests by stubbing localhost:8080 network calls
    setupMocks()

    // Visit page and login
    cy.visit('/')
    LoginOperator.login();
    cy.wait(['@userLogin','@getPetsByStatus'])

    cy.findByRole('button', {
      name: /Edit Lion 1/i,
    }).click();
    PetListOperator.updateForm('Lioness 1', 'sold');
    PetListOperator.cancelForm('Lioness 1');

    cy.findByText('Lion 1').parent().findByText('available');
  })

  it('successfully deletes a pet item', () => {
    // Isolate tests by stubbing localhost:8080 network calls
    setupMocks();

    // Visit page and login
    cy.visit('/')
    LoginOperator.login();
    cy.wait(['@userLogin','@getPetsByStatus'])

    // Delete the Lion 1 pet
    PetListOperator.deletePet('Lion 1');
    cy.wait(['@deletePet']);
    cy.findByText('Lion 1').should('not.exist');

    // Ensure Lion 1 isn't found pending
    PetListOperator.changeStatusFilter('pending');
    cy.wait(['@getPetsByStatus']);
    cy.findByText('Lion 1').should('not.exist');

    // Ensure Lion 1 isn't found sold
    PetListOperator.changeStatusFilter('sold');
    cy.wait(['@getPetsByStatus']);
    cy.findByText('Lion 1').should('not.exist');
  })

  it('successfully adds a new pet item', () => {
    setup();

    // Add a new pet tornado
    PetListOperator.addPet('Tornado', 'pending');
    cy.wait(['@addPet']);
    cy.findByText('Tornado').parent().findByText('pending');

    // Tornado should not be listed as sold
    PetListOperator.changeStatusFilter('sold');
    cy.wait(['@getPetsByStatus']);
    cy.findByText('Tornado').should('not.exist');

    // Tornado should no longer be in the available screen
    PetListOperator.changeStatusFilter('available');
    cy.wait(['@getPetsByStatus']);
    cy.findByText('Tornado').should('not.exist');

    // Tornado should be in the pending screen
    PetListOperator.changeStatusFilter('pending');
    cy.wait(['@getPetsByStatus']);
    cy.findByText('Tornado').parent().findByText('pending');
  })
})
