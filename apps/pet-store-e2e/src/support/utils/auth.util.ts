import { petsMock } from '../../fixtures/pets-mock';

/**
 * Not calling this before your tests essentially turns the tests into live tests
 */
export function setupMocks() {
  setupUserMocks();
  setupPetMocks();
  // catchall request to localhost8080 that fall through
  cy.intercept('http://localhost:8080*')
}

/**
 * This implementation ensures that the data is "processed" as expected and allows
 * every test that needs pet data to start with the same set of mock data.
 * #predicatable #repeatable
 */
export function setupPetMocks() {
  let pets = [...petsMock]

  // Get Pets by status
  cy.intercept('GET', 'http://localhost:8080/api/v3/pet/findByStatus*', req => {
    const status = req.query.status ?? 'available';
    req.reply({
      statusCode: 200,
      body: pets.filter((pet) => pet.status === status),
    })
  }).as('getPetsByStatus')

  // Update Pet
  cy.intercept('POST', 'http://localhost:8080/api/v3/pet/*', req => {
    const url = new URL(req.url);
    const pathname = url.pathname;
    const petId = Number(pathname.split('/').pop());
    const pet = {
      id: petId,
      status: url.searchParams.get('status'),
      name: url.searchParams.get('name'),
    }
    req.reply({
      statusCode: 200,
      body: pet
    })

    pets = pets.map((p) => p.id === pet.id ? pet : p)
  }).as('updatePet')

  // Add Pet
  cy.intercept('POST', 'http://localhost:8080/api/v3/pet*', req => {
    const newPet = req.body
    pets.push(newPet);
    req.reply({
      statusCode: 200,
      body: newPet
    })
  }).as('addPet');

  // Delete Pet
  cy.intercept('DELETE', 'http://localhost:8080/api/v3/pet/*', req => {
    const url = new URL(req.url);
    const pathname = url.pathname;
    const petId = Number(pathname.split('/').pop());
    pets.splice(pets.findIndex((pet) => pet.id === petId), 1);
    req.reply({
      statusCode: 200,
      body: 'Pet deleted'
    })
  }).as('deletePet');
}

export function setupUserMocks() {
  cy.intercept('GET', 'http://localhost:8080/api/v3/user/login*', {
    statusCode: 200,
    body: 'Logged in user session: 199746593242941440'
  }).as('userLogin')
}
