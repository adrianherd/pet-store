import { deletePet, Pet, PetActions, PetStatus, updatePet } from '@pet-store/shared/core/pet/util';
import EditablePetItem from './editable-pet-item';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, expect } from 'vitest';

const MOCK_PET: Pet = {
  id: 123,
  name: 'Pooki',
  status: PetStatus.Pending,
}

vi.mock('@pet-store/shared/core/pet/util', async (importOriginal) => {
  return {
    ...await importOriginal<typeof import('@pet-store/shared/core/pet/util')>(),
    updatePet: vi.fn(),
    deletePet: vi.fn(),
  }
})


function setup({
  pet = MOCK_PET
}: { pet?: Pet } = {}) {
  const dispatch = vi.fn();
  const user = userEvent.setup();
  render(<EditablePetItem {...{pet, dispatch}} />)

  return {
    dispatch,
    user,
  }
}

describe('Editable Pet Item', () => {
  beforeEach(() => { vi.clearAllMocks() })
  it('shows pet information', () => {
    setup();
    expect(screen.getByText(MOCK_PET.name)).toBeTruthy();
    expect(screen.getByText(MOCK_PET.status)).toBeTruthy();
  })
  it('sends a delete request when delete button is clicked', async () => {
    const { user } = setup();
    const deleteButton = screen.getByRole('button', { name: /delete pooki/i });
    await user.click(deleteButton);
    expect(deletePet).toHaveBeenCalled();
  })
  it('triggers a delete dispatch when delete button is clicked', async () => {
    const { user, dispatch } = setup();
    const deleteButton = screen.getByRole('button', { name: /delete pooki/i });
    await user.click(deleteButton);
    expect(dispatch).toHaveBeenCalledWith({
      type: PetActions.Deleted,
      payload: MOCK_PET.id,
    });
  })
  it('switches to form when edit button is clicked', async () => {
    const { user} = setup();
    const editButton = screen.getByRole('button', { name: /edit pooki/i });
    await user.click(editButton);
    expect(screen.getByLabelText(/name/i)).toBeTruthy();
    expect(screen.getByRole('combobox', { name: /status/i })).toBeTruthy();
  })
  it('switches to pet view when save button is clicked', async () => {
    const { user} = setup();

    const editButton = screen.getByRole('button', { name: /edit pooki/i });
    await user.click(editButton);
    expect(screen.getByLabelText(/name/i)).toBeTruthy();

    const saveButton = screen.getByRole('button', { name: /save/i });
    await user.click(saveButton);
    expect(screen.getByText(/pooki/i)).toBeTruthy();
    expect(screen.getByText(/pending/i)).toBeTruthy();
  })
  it('sends a update request when save button is clicked', async () => {
    const { user} = setup();

    const editButton = screen.getByRole('button', { name: /edit pooki/i });
    await user.click(editButton);
    expect(screen.getByLabelText(/name/i)).toBeTruthy();

    const saveButton = screen.getByRole('button', { name: /save/i });
    await user.click(saveButton);
    expect(updatePet).toHaveBeenCalled();
  })
  it('triggers an update dispatch when save button is clicked', async () => {
    const { user, dispatch } = setup();
    const editButton = screen.getByRole('button', { name: /edit pooki/i });
    await user.click(editButton);
    expect(screen.getByLabelText(/name/i)).toBeTruthy();

    const saveButton = screen.getByRole('button', { name: /save/i });
    await user.click(saveButton);
    expect(dispatch).toHaveBeenCalled();
  })
  it('switches to pet view when cancel button is clicked', async () => {
    const { user} = setup();
    const editButton = screen.getByRole('button', { name: /edit pooki/i });
    await user.click(editButton);
    expect(screen.getByLabelText(/name/i)).toBeTruthy();

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    await user.click(cancelButton);
    expect(screen.getByText(/pooki/i)).toBeTruthy();
    expect(screen.getByText(/pending/i)).toBeTruthy();
  })
  it('does not send any requests nor dispatches when cancel button is clicked', async () => {
    const { user, dispatch} = setup();
    const editButton = screen.getByRole('button', { name: /edit pooki/i });
    await user.click(editButton);

    expect(screen.getByLabelText(/name/i)).toBeTruthy();
    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    await user.click(cancelButton);

    expect(updatePet).not.toHaveBeenCalled();
    expect(deletePet).not.toHaveBeenCalled();
    expect(dispatch).not.toHaveBeenCalled();
  })
})
