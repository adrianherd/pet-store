import { Pet, PetStatus } from '@pet-store/shared/core/pet/util';
import { render, screen } from '@testing-library/react';
import FormPetItem from './form-pet-item';
import userEvent from '@testing-library/user-event';

const MOCK_PET: Pet = {
  id: 123,
  name: 'Pooki',
  status: PetStatus.Pending,
}

function setup({
  pet = MOCK_PET
}: { pet?: Pet } = {}) {
  const user = userEvent.setup();
  const onCancel = vi.fn();
  const onSave = vi.fn();
  render(<FormPetItem {...{pet, onCancel, onSave}} />)

  return {
    onCancel,
    onSave,
    user,
  }
}

describe('Form Pet Item', () => {
  it('has a Name text input', () => {
    setup();
    expect(screen.getByLabelText(/name/i)).toBeTruthy();
  })
  it('has a Status selector', () => {
    setup();
    expect(screen.getByRole('combobox', { name: /status/i })).toBeTruthy();
  })
  it('has a Cancel button', () => {
    setup();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeTruthy();
  })
  it('triggers onCancel when Cancel button is clicked', async () => {
    const { user, onCancel } = setup();
    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    await user.click(cancelButton);
    expect(onCancel).toHaveBeenCalled();
  })
  it('has a Save button', () => {
    setup();
    expect(screen.getByRole('button', { name: /save/i })).toBeTruthy();
  })
  it('triggers onSave when Save button is clicked', async () => {
    const { user, onSave } = setup();
    const saveButton = screen.getByRole('button', { name: /save/i });
    await user.click(saveButton);
    expect(onSave).toHaveBeenCalled();
  })
})
