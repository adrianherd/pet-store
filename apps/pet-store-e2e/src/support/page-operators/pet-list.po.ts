import { Pet, PetStatus } from '@pet-store/shared/core/pet/util';

export const PetListOperator = {
  addPet,
  deletePet,
  updatePet,
  changeStatusFilter,
}

export function addPet({ name, status }: Pet) { /* TODO: fill in */ }
export function deletePet(id: string) { /* TODO: fill in */ }
export function updatePet({ name, status }: Pet) { /* TODO: fill in */ }
export function changeStatusFilter(status: PetStatus) { /* TODO: fill in */ }


