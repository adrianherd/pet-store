import { Pet, PetStatus } from './pet-reducer';

export async function getPetsByStatus(status?: PetStatus)  {
  const getPetsByStatusUrl = new URL('http://localhost:8080/pets/findByStatus')
  if (status) {
    getPetsByStatusUrl.searchParams.set('status', status);
  }
  return await fetch(getPetsByStatusUrl, {
    method: "GET",
  });
}

export async function updatePet({ id, name, status }: Pet) {
  const updatePetUrl = new URL(`http://localhost:8080/pet/${id}`)
  updatePetUrl.searchParams.set('name', name);
  updatePetUrl.searchParams.set('status', status);

  return await fetch(updatePetUrl, {
    method: "POST",
  });
}

export async function deletePet(id: number) {
  const deletePetUrl = new URL(`http://localhost:8080/pet/${id}`);
  return await fetch(deletePetUrl, {
    method: "DELETE",
  })
}

export async function addPet(pet: Pet) {
  const addPetUrl = new URL(`http://localhost:8080/pet`)
  return await fetch(addPetUrl, {
    method: "POST",
    body: JSON.stringify(pet)
  })
}
