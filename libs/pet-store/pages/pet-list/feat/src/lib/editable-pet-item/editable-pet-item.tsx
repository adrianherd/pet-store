import { deletePet, Pet, PetActions, PetActionTypes, updatePet } from '@pet-store/shared/core/pet/util';
import { Dispatch, useState } from 'react';
import PetItem from '../pet-item/pet-item';
import FormPetItem from '../form-pet-item/form-pet-item';
import Divider from '@mui/material/Divider';

export interface EditablePetItemProps {
  pet: Pet;
  dispatch: Dispatch<PetActionTypes>;
}
export function EditablePetItem({ pet, dispatch }: EditablePetItemProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleDeletePet = async () => {
    await deletePet(pet.id);
    dispatch({
      type: PetActions.Deleted,
      payload: pet.id,
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
    <>
      { !isEditing
        ? <PetItem
          pet={pet}
          handleEdit={() => setIsEditing(true)}
          handleDelete={() => handleDeletePet()} />
        : <FormPetItem
          pet={pet}
          onCancel={() => setIsEditing(false)}
          onSave={(name, status) => {
            void handleUpdatePet({...pet, name, status});
            setIsEditing(false);
          }}
        />
      }
      <Divider component="li"/>
    </>
  )
}

export default EditablePetItem;
