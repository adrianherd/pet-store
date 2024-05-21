import { Pet, PetStatus } from '@pet-store/shared/core/pet/util';
import { useState } from 'react';
import ListItem from '@mui/material/ListItem';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import Grid from '@mui/material/Grid';
import { TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export interface FormPetItemProps {
  pet: Pet;
  onCancel: () => void;
  onSave: (name: string, status: PetStatus) => void;
}
export function FormPetItem({ pet, onCancel, onSave }: FormPetItemProps) {
  const [name, setName] = useState(pet.name);
  const [status, setStatus] = useState(pet.status);
  return (
    <ListItem
      secondaryAction={
        <Stack direction="row" spacing={1}>
          <IconButton edge="end" aria-label={`Cancel ${name} changes}`} onClick={() => onCancel()}>
            <CancelIcon />
          </IconButton>
          <IconButton edge="end" aria-label={`Save ${name} changes`} onClick={() => onSave(name, status)}>
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
            id={`update-pet-name-${pet.id}`}
            value={name}
            onChange={
              ({target: {value}}) => setName(value)}
          />
        </Grid>
        <Grid item xs={5}>
          <FormControl variant="standard" fullWidth>
            <InputLabel id={`pet-status-label-${pet.id}`} htmlFor={`update-pet-status-${pet.id}`}>Status</InputLabel>
            <Select
              labelId={`pet-status-label-${pet.id}`}
              id={`update-pet-status-select-${pet.id}`}
              inputProps={{id: `update-pet-status-${pet.id}`}}
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

export default FormPetItem
