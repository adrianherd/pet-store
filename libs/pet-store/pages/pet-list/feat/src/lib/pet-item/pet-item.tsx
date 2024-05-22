import { Pet, PetStatus } from '@pet-store/shared/core/pet/util';
import ListItem from '@mui/material/ListItem';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import PetsIcon from '@mui/icons-material/Pets';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import styles from '../pet-list.module.scss';

export interface PetItemProps {
  pet: Pet;
  deleteHandler: () => void,
  editHandler: () => void
}
export function PetItem({ pet, editHandler, deleteHandler }: PetItemProps) {
  const colorMap: Record<PetStatus, 'primary' | 'success' | 'warning'> = {
    [PetStatus.Available]: 'primary',
    [PetStatus.Pending]: 'warning',
    [PetStatus.Sold]: 'success',
  }
  return (
    <ListItem
      secondaryAction={
        <Stack direction="row" spacing={1}>
          <IconButton edge="end" aria-label={`Edit ${pet.name}`} onClick={() => editHandler()}>
            <EditIcon />
          </IconButton>
          <IconButton edge="end" aria-label={`Delete ${pet.name}`} onClick={() => deleteHandler()}>
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

export default PetItem;
