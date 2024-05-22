import { Pet, PetStatus } from '@pet-store/shared/core/pet/util';
import { render, screen } from '@testing-library/react';
import PetItem from './pet-item';
import userEvent from '@testing-library/user-event';

const MOCK_PET: Pet = {
  name: 'Sprinkles',
  status: PetStatus.Sold,
  id: 123.
}
function setup({pet = MOCK_PET}: { pet?: Pet } = {}) {
  const editHandler = vi.fn();
  const deleteHandler = vi.fn();


  const user = userEvent.setup();

  render(<PetItem {...{pet, editHandler, deleteHandler}} />)
  return {
    editHandler,
    deleteHandler,
    user
  }
}


describe('Pet Item', () => {
  it('shows the name of the pet', () => {
    setup();
    expect(screen.getByText(/sprinkles/i)).toBeTruthy();
  })
  it('shows the status of the pet', () => {
    setup();
    expect(screen.getByText(/sold/i)).toBeTruthy();
  })
  it('available status is displayed with primary coloring', () => {
    setup({
      pet: {...MOCK_PET, status: PetStatus.Available}
    });
    expect(screen.getByText(/available/i).parentElement?.classList).toContain('MuiChip-colorPrimary');
  })
  it('pending status is displayed with warning coloring', () => {
    setup({
      pet: {...MOCK_PET, status: PetStatus.Pending}
    });
    expect(screen.getByText(/pending/i).parentElement?.classList).toContain('MuiChip-colorWarning');
  })
  it('sold status is displayed with success coloring', () => {
    setup();
    expect(screen.getByText(/sold/i).parentElement?.classList).toContain('MuiChip-colorSuccess');
  })
  it('has a edit button', () => {
    setup();
    expect(screen.getByRole('button', {
      name: /edit sprinkles/i
    })).toBeTruthy();
  })
  it('triggers handleEdit on edit button click', async () => {
    const { user, editHandler} = setup();
    const editButton = screen.getByRole('button', {
      name: /edit sprinkles/i
    })
    await user.click(editButton);
    expect(editHandler).toHaveBeenCalled();
  })
  it('has a delete button', () => {
    setup();
    expect(screen.getByRole('button', {
      name: /delete sprinkles/i
    })).toBeTruthy();
  })
  it('has a delete button with a proper label', () => {
    setup({
      pet: {...MOCK_PET, name: 'Pooki'}
    })
    // the aria label should not just say "delete" since this element will
    // be repeated many times. Aria label should at least include the name
    expect(screen.getByRole('button', {
      name: /delete pooki/i
    })).toBeTruthy();
  })
  it('triggers handleDelete on delete button click',async  () => {
    const { user, deleteHandler} = setup();
    const deleteButton = screen.getByRole('button', {
      name: /delete sprinkles/i
    });
    await user.click(deleteButton);
    expect(deleteHandler).toHaveBeenCalled();
  })
})
