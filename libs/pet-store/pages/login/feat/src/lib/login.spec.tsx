import { render, screen } from '@testing-library/react';
import { UserAuthContext } from '@pet-store/shared/core/user/data-access';
import Login from './login';
import { expect } from 'vitest';

vi.mock('react-router-dom', () => ({ useNavigate: vi.fn() }))


function setup() {
  const setIsAuthenticatedMock = vi.fn();
  render(
    <UserAuthContext.Provider value={{
      isAuthenticated: false,
      setIsAuthenticated: setIsAuthenticatedMock }}
    >
      <Login />
    </UserAuthContext.Provider>
  );
  return {
    setIsAuthenticatedMock
  }
}

describe('Login', () => {
  it('has a login title', () => {
    setup();
    const titleEl = screen.getByRole('heading', { name: /Pet Store SSO/i });
    expect(titleEl).toBeTruthy();
  });
  it('has a email field', () => {
    setup();
    const emailInput = screen.getByLabelText(/Email/i);
    expect(emailInput).toBeTruthy();
  })
  it('has a password field', () => {
    setup();
    const passwordInput = screen.getByLabelText(/Password/i);
    expect(passwordInput).toBeTruthy();
  })
  it('has a login button', () => {
    setup();
    const loginBtn = screen.getByRole('button', { name: /Login/i });
    expect(loginBtn).toBeTruthy();
  })
  it('makes a login request on login button click', () => {

  })
  it('shows a loading bar while login request is being made', () => {

  })
  it('triggers a user login event on successful login request', () => {

  })
});
