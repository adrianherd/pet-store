import { render } from '@testing-library/react';
import { vi } from 'vitest';
import App from './app';
import { UserAuthContextProvider } from '@pet-store/shared/core/user/data-access';
import { RouterProvider } from 'react-router-dom';

vi.mock('@pet-store/shared/core/user/data-access', () => ({
  UserAuthContextProvider: vi.fn(({ children }) => children),
}));

vi.mock('react-router-dom', async (importOriginal) => {
  return {
    ...await importOriginal<typeof import('react-router-dom')>(),
    RouterProvider: vi.fn(),
  }
})

describe('App', () => {
  beforeEach(() => {
    // Clear all mock calls before each test
    vi.clearAllMocks()
  });

  it('provides a UserAuthContextProvider', () => {
    render(<App />);
    expect(vi.mocked(UserAuthContextProvider)).toHaveBeenCalled();
  });

  it('provides a RouterContext', () => {
    render(<App />);
    expect(vi.mocked(RouterProvider)).toHaveBeenCalled();
  });
});
