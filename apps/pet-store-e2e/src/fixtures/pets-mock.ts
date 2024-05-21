import { Pet, PetStatus } from '@pet-store/shared/core/pet/util';

export const petsMock: Pet[] = [
  {
    'id': 1,
    'name': 'Cat 1',
    'status': PetStatus.Available
  },
  {
    'id': 2,
    'name': 'Cat 2',
    'status': PetStatus.Available
  },
  {
    'id': 4,
    'name': 'Dog 1',
    'status': PetStatus.Available
  },
  {
    'id': 7,
    'name': 'Lion 1',
    'status': PetStatus.Available
  },
  {
    'id': 8,
    'name': 'Lion 2',
    'status': PetStatus.Available
  },
  {
    'id': 9,
    'name': 'Lion 3',
    'status': PetStatus.Available
  },
  {
    'id': 10,
    'name': 'Rabbit 1',
    'status': PetStatus.Available
  },
  {
    'id': 3,
    'name': 'Cat 3',
    'status': PetStatus.Pending
  },
  {
    'id': 6,
    'name': 'Dog 3',
    'status': PetStatus.Pending
  },
  {
    'id': 5,
    'name': 'Dog 2',
    'status': PetStatus.Sold
  }
]
