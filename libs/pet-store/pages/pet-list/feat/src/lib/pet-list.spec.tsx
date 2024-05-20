import { render } from '@testing-library/react';

import PetList from './pet-list';

describe('PetList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PetList />);
    expect(baseElement).toBeTruthy();
  });
});
