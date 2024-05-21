import { PetStatus } from '@pet-store/shared/core/pet/util';
import { petsMock } from '../../fixtures/pets-mock';

export function setupPetMocks() {
  const pets = [...petsMock]

  // Get Pets by status
  cy.intercept('GET', 'http://localhost:8080/api/v3/pet/findByStatus', req => {
    const status = req.query.status ?? PetStatus.Available;
    return {
      statusCode: 200,
      body: pets.filter((pet) => pet.status === status),
    }
  })

  // Update Pet
  cy.intercept('POST', 'http://localhost:8080/api/v3/pet/*', req => {
    const url = new URL(req.url);
    const pathname = url.pathname;
    const petId = Number(pathname.split('/').pop());
    return {
      statusCode: 200,
      body: {
        id: petId,
        status: url.searchParams.get('status'),
        name: url.searchParams.get('name'),
      }
    }
  })

  // Add Pet
  cy.intercept('POST', 'http://localhost:8080/api/v3/pet', req => {
    const newPet = req.body
    pets.push(newPet);
    return {
      statusCode: 200,
      body: newPet
    }
  }).as('addPet');

  // Delete Pet
  cy.intercept('DELETE', 'http://localhost:8080/api/v3/pet/*', req => {
    const url = new URL(req.url);
    const pathname = url.pathname;
    const petId = Number(pathname.split('/').pop());
    pets.splice(pets.findIndex((pet) => pet.id === petId), 1);
    return {
      statusCode: 200,
      body: 'Pet deleted'
    }
  })
}

export function setupUserMocks() {
  cy.intercept('GET', 'http://localhost:8080/api/v3/user/login', {
    statusCode: 200,
    body: 'Logged in user session: 199746593242941440'
  })
}
