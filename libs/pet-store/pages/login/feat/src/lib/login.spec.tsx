import { render } from '@testing-library/react';

import Login from './login';


describe('Login', () => {
  it('has a login title', () => {
    const { baseElement } = render(<Login />);
    expect(baseElement).toBeTruthy();
  });
  it('has a email field')
  it('has a password field')
  it('has a login button')
  it('makes a login request on login button click')
  it('shows a loading bar while login request is being made')
  it('triggers a user login event on successful login request')
});
