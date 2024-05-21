import { createContext, ReactNode, useEffect, useState } from 'react';
import { IS_AUTHENTICATED_TOKEN } from '@pet-store/shared/core/user/util';

export interface AuthContext {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export const UserAuthContext = createContext<AuthContext>({
  isAuthenticated: false,
  // This function is a stubbed default value and replaced with a useState set dispatch in provider below
  setIsAuthenticated: (authenticated: boolean) => authenticated
});

export const UserAuthContextProvider = ({ children }: { children: ReactNode}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    sessionStorage.setItem(IS_AUTHENTICATED_TOKEN, `${isAuthenticated}`)
  }, [isAuthenticated]);

  return (
    <UserAuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </UserAuthContext.Provider>
  );
}
