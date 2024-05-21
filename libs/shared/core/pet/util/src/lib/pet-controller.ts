import { Pet, PetStatus } from './pet-reducer';

export async function getPetsByStatus(status?: PetStatus)  {
  const getPetsByStatusUrl = new URL('http://localhost:8080/api/v3/pet/findByStatus')
  if (status) {
    getPetsByStatusUrl.searchParams.set('status', status);
  }
  return await fetch(getPetsByStatusUrl, {
    method: "GET",
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json',
    }
  });
}

export async function updatePet({ id, name, status }: Pet) {
  const updatePetUrl = new URL(`http://localhost:8080/api/v3/pet/${id}`)
  updatePetUrl.searchParams.set('name', name);
  updatePetUrl.searchParams.set('status', status);

  return await fetch(updatePetUrl, {
    method: "POST",
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json',
    }
  });
}

export async function deletePet(id: number) {
  const deletePetUrl = new URL(`http://localhost:8080/api/v3/pet/${id}`);
  return await fetch(deletePetUrl, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
      'api_key': 'abc123',
    }
  })
}

export async function addPet(pet: Pet) {
  const addPetUrl = new URL(`http://localhost:8080/api/v3/pet`)
  return await fetch(addPetUrl, {
    method: "POST",
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pet)
  })
}
