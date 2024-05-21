export enum PetStatus {
  Available = 'available',
  Pending = 'pending',
  Sold = 'Sold',
}

export interface Pet {
  status: PetStatus,
  id: number,
  name: string,
}

export enum PetActions {
  Added = 'pet-added',
  Deleted = 'pet-deleted',
  GetByStatusChanged = 'pet-get-by-status-changed',
  Updated = 'pet-updated',
}

export type PetActionTypes =
  | { type: PetActions.Added, payload: Pet }
  | { type: PetActions.Deleted, payload: number }
  | { type: PetActions.GetByStatusChanged, payload: Pet[] }
  | { type: PetActions.Updated, payload: Pet }

export const petsInitialState: Pet[] = []

export function petsReducer(pets: Pet[], { type, payload }: PetActionTypes) {
  switch(type) {
    case PetActions.Added:
      return [...pets, payload];
    case PetActions.Deleted:
      return pets.filter(pet => pet.id === payload);
    case PetActions.Updated:
      return pets.map((pet) => (pet.id === payload.id) ? payload : pet);
    case PetActions.GetByStatusChanged:
      return payload;
    default:
      throw new Error(`Unknown pet type ${type}`);
  }
}
