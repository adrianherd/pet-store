import styles from './pet-list.module.scss';
import { useCallback, useEffect, useReducer, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import List from '@mui/material/List';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {
  addPet,
  getPetsByStatus,
  Pet,
  PetActions,
  petsInitialState,
  petsReducer,
  PetStatus,
} from '@pet-store/shared/core/pet/util';
import FormPetItem from './form-pet-item/form-pet-item';
import EditablePetItem from './editable-pet-item/editable-pet-item';

export function PetList() {
  const [pets, dispatch]  = useReducer(petsReducer, petsInitialState);
  const [newPets, setNewPets] = useState<number[]>([]);
  const [status, setStatus] = useState(PetStatus.Available);

  const handlePetsByStatus = useCallback(async () => {
    const res = await getPetsByStatus(status);
    const petsList = res.status >= 400 ? [] : await res.json() as Pet[];
    dispatch({
      type: PetActions.GetByStatusChanged,
      payload: petsList ?? [],
    })
  }, [status]);
  useEffect( () => { void handlePetsByStatus() }, [handlePetsByStatus])

  const handleAddPet = async (pet: Pet) => {
    await addPet(pet);
    dispatch({
      type: PetActions.Added,
      payload: pet,
    })
  }

  const handleDeleteForm = (id: number) => {
    setNewPets(newPets.filter((petId) => petId !== id))
  }

  return (
    <Container maxWidth="sm">
      <h1 className={styles.header}>Welcome to PetList!</h1>
      <Stack spacing={6}>
        <FormControl fullWidth>
          <InputLabel id="pet-status-filter-label" htmlFor="pet-status-filter-value">Status Filter</InputLabel>
          <Select
            labelId="pet-status-filter-label"
            id="pet-status-filter-select"
            inputProps={{id: 'pet-status-filter-value'}}
            value={status}
            label="Status Filter"
            onChange={({target: { value }}) => setStatus(value as PetStatus) }
          >
            <MenuItem value={PetStatus.Available}>Available</MenuItem>
            <MenuItem value={PetStatus.Pending}>Pending</MenuItem>
            <MenuItem value={PetStatus.Sold}>Sold</MenuItem>
          </Select>
        </FormControl>
        <List>
          {pets.map((pet) => <EditablePetItem key={pet.id} {...{pet,dispatch}} />)}
          {newPets.map((id) => <FormPetItem
            key={id}
            pet={{id, name: '', status: PetStatus.Available}}
            onCancel={() => handleDeleteForm(id)}
            onSave={(name, status) => {
              void handleAddPet({id, name, status});
              handleDeleteForm(id);
            }}
          />)}
        </List>
        <Box textAlign="center">
          <IconButton
            aria-label="Add new pet"
            color="primary"
            size="large"
            onClick={() => setNewPets([...newPets, Math.floor(Math.random() * 10000)])}
          >
            <AddCircleIcon fontSize="large" />
          </IconButton>
        </Box>
      </Stack>
    </Container>
  );
}

export default PetList;
