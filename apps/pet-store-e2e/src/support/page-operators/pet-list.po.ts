export const PetListOperator = {
  addPet,
  deletePet,
  updatePet,
  changeStatusFilter,
  updateForm,
  saveForm,
  cancelForm,
}

export function updateForm(name: string, status: string) {
  cy.findByLabelText(/Name/i).clear();
  cy.findByLabelText(/Name/i).type(name);
  cy.findByLabelText(/Name/i).closest('li').findByRole('combobox', { name: /Status/i }).click();
  cy.findByRole('option', { name: new RegExp(`${status}`, 'i')}).click();
}
export function saveForm(name: string) {
  cy.findByRole('button', {
    name: new RegExp(`Save ${name} changes`, 'i')
  }).click();
}
export function cancelForm(name: string) {
  cy.findByRole('button', {
    name: new RegExp(`Cancel ${name} changes`, 'i')
  }).click();
}

export function addPet(name: string, status: string) {
  cy.findByRole('button', { name: /Add new pet/i }).click();
  updateForm(name, status);
  saveForm(name);
}
export function deletePet(name: string) {
  cy.findByRole('button', {
    name: new RegExp(`Delete ${name}`, 'i')
  }).click();
}
export function updatePet(oldName: string, newName: string, newStatus: string) {
  cy.findByRole('button', {
    name: new RegExp(`Edit ${oldName}`, 'i')
  }).click();
  updateForm(newName, newStatus);
  saveForm(newName);
}
export function changeStatusFilter(status: string) {
  cy.findByRole('combobox', { name: /Status Filter/i}).click()
  cy.findByRole('option', { name: new RegExp(`${status}`, 'i')}).click();
}


