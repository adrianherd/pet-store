import { render, screen, waitFor } from '@testing-library/react';
import { UserAuthContext } from '@pet-store/shared/core/user/data-access';
import { beforeEach, expect } from 'vitest';
import { http, HttpResponse } from 'msw';
import userEvent from '@testing-library/user-event'
import Login from './login';
import { setupServer } from 'msw/node';

vi.mock('react-router-dom', () => ({ useNavigate: vi.fn(() => vi.fn()) }))

const LOGIN_200_TEXT = 'Logged in user session: 199746593242941440'
const handlers = [
  http.get('http://localhost:8080/api/v3/user/login', ({ request }) => {
    return HttpResponse.text(LOGIN_200_TEXT)
  })
];
const server = setupServer(...handlers);

function setup() {
  const user = userEvent.setup();
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
    setIsAuthenticatedMock,
    user,
  }
}

describe('Login', () => {
  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
  // if you need to add a handler after calling setupServer for some specific test,this will
  // remove that handler for the rest of them (which is important for test isolation):
  afterEach(() => {
    server.resetHandlers()
    vi.restoreAllMocks();
  })
  afterAll(() => server.close())

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
  it('makes a login request on login button click', async () => {
    const { user } = setup();
    const loginFetched = vi.fn();
    server.use(http.get('http://localhost:8080/api/v3/user/login', () => {
      loginFetched()
      return HttpResponse.text(LOGIN_200_TEXT);
    }))
    const loginBtn = screen.getByRole('button', { name: /Login/i });
    await user.click(loginBtn);
    expect(loginFetched).toHaveBeenCalled();
  })
  it('shows a loading bar while login request is being made', async () => {
    const { user } = setup();
    let httpResolver: (value?: unknown) => void = () => { /* Initialize to avoid lint errors. Replaced below */};
    server.use(http.get('http://localhost:8080/api/v3/user/login', async () => {
      await new Promise((res) => { httpResolver = res });
      return HttpResponse.text(LOGIN_200_TEXT);
    }))
    expect(screen.queryByRole('progressbar')).toBeNull();

    const loginBtn = screen.getByRole('button', { name: /Login/i });
    await user.click(loginBtn);
    expect(screen.getByRole('progressbar')).toBeTruthy();

    httpResolver();
    // We need to allow time for the component to update itself
    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).toBeNull();
    })
  })
  it('triggers a user login event on successful login request', async () => {
    const { user, setIsAuthenticatedMock } = setup();

    const loginBtn = screen.getByRole('button', { name: /Login/i });
    await user.click(loginBtn);

    expect(setIsAuthenticatedMock).toHaveBeenCalled();
    expect(screen.queryByRole('progressbar')).toBeNull();
  })
});
