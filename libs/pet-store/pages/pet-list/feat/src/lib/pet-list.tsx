import styles from './pet-list.module.scss';
import { Dispatch, useCallback, useEffect, useReducer, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PetsIcon from '@mui/icons-material/Pets';
import SaveIcon from '@mui/icons-material/Save';
import {
  addPet,
  deletePet,
  getPetsByStatus,
  Pet,
  PetActions,
  PetActionTypes,
  petsInitialState,
  petsReducer,
  PetStatus,
  updatePet
} from '@pet-store/shared/core/pet/util';
import { TextField } from '@mui/material';

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
          <InputLabel id="pet-status-filter-label">Status</InputLabel>
          <Select
            labelId="pet-status-filter-label"
            id="pet-status-file"
            value={status}
            label="Status"
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

interface EditablePetItemProps {
  pet: Pet;
  dispatch: Dispatch<PetActionTypes>;
}
function EditablePetItem({ pet, dispatch }: EditablePetItemProps) {
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

interface FormPetItemProps {
  pet: Pet;
  onCancel: () => void;
  onSave: (name: string, status: PetStatus) => void;
}
function FormPetItem({ pet, onCancel, onSave }: FormPetItemProps) {
  const [name, setName] = useState(pet.name);
  const [status, setStatus] = useState(pet.status);
  return (
    <ListItem
      secondaryAction={
        <Stack direction="row" spacing={1}>
          <IconButton edge="end" aria-label="cancel" onClick={() => onCancel()}>
            <CancelIcon />
          </IconButton>
          <IconButton edge="end" aria-label="save" onClick={() => onSave(name, status)}>
            <SaveIcon />
          </IconButton>
        </Stack>
      }
    >
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <TextField
            autoFocus
            variant="standard"
            label="Name"
            id="update-pet-name"
            value={name}
            onChange={
              ({target: {value}}) => setName(value)}
          />
        </Grid>
        <Grid item xs={5}>
          <FormControl variant="standard" fullWidth>
            <InputLabel id="pet-status-label">Status</InputLabel>
            <Select
              labelId="update-pet-status-label"
              id="update-pet-status"
              value={status}
              label="Status"
              onChange={({target: { value }}) => { setStatus(value as PetStatus) }}
            >
              <MenuItem value={PetStatus.Available}>Available</MenuItem>
              <MenuItem value={PetStatus.Pending}>Pending</MenuItem>
              <MenuItem value={PetStatus.Sold}>Sold</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </ListItem>
  )
}

interface PetItemProps {
  pet: Pet;
  handleDelete: () => void,
  handleEdit: () => void
}
function PetItem({ pet, handleEdit, handleDelete }: PetItemProps) {
  const colorMap: Record<PetStatus, 'primary' | 'success' | 'warning'> = {
    [PetStatus.Available]: 'primary',
    [PetStatus.Pending]: 'warning',
    [PetStatus.Sold]: 'success',
  }
  return (
    <ListItem
      secondaryAction={
        <Stack direction="row" spacing={1}>
          <IconButton edge="end" aria-label="edit" onClick={() => handleEdit()}>
            <EditIcon />
          </IconButton>
          <IconButton edge="end" aria-label="delete" onClick={() => handleDelete()}>
            <DeleteIcon />
          </IconButton>
        </Stack>
      }
    >
      <ListItemAvatar>
        <Avatar>
          <PetsIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText>
        <Grid container>
          <Grid item xs={8}>
            {pet.name}
          </Grid>
          <Grid item xs={4} justifyContent={'right'}>
            <Chip variant="outlined" color={colorMap[pet.status]} label={pet.status} className={styles.chip}/>
          </Grid>
        </Grid>
      </ListItemText>
    </ListItem>
  )
}

export default PetList;
