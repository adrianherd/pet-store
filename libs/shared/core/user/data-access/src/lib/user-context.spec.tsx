import { render } from '@testing-library/react';

import UserContext from './user-context';

describe('UserContext', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UserContext />);
    expect(baseElement).toBeTruthy();
  });
});
