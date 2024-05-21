import styles from './pet-list.module.scss';
import { useCallback, useEffect, useReducer, useState } from 'react';
import {
  addPet,
  deletePet,
  getPetsByStatus,
  Pet,
  PetActions,
  petsInitialState,
  petsReducer,
  PetStatus, updatePet
} from '@pet-store/shared/core/pet/util';

export function PetList() {
  const [pets, dispatch]  = useReducer(petsReducer, petsInitialState);
  const [status, setStatus] = useState(PetStatus.Available);


  const handlePetsByStatus = useCallback(async () => {
    const res = await getPetsByStatus(status);
    const petsList = await res.json() as Pet[];
    dispatch({
      type: PetActions.GetByStatusChanged,
      payload: petsList,
    })
  }, [status]);
  useEffect( () => { void handlePetsByStatus() }, [handlePetsByStatus])

  const handleDeletePet = async (id: number) => {
    await deletePet(id);
    dispatch({
      type: PetActions.Deleted,
      payload: id,
    })
  }

  const handleAddPet = async (pet: Pet) => {
    await addPet(pet);
    dispatch({
      type: PetActions.Added,
      payload: pet,
    })
  }

  const handleUpdatePet = async (pet: Pet) => {
    await updatePet(pet);
    dispatch({
      type: PetActions.Updated,
      payload: pet,
    })
  }
  return (
    <div className={styles['container']}>
      <h1>Welcome to PetList!</h1>
    </div>
  );
}

export default PetList;
