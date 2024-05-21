import { createContext, ReactNode, useEffect, useState } from 'react';
import { IS_AUTHENTICATED_TOKEN } from '@pet-store/shared/core/user/util';

export interface AuthContext {
  isAuthenticated: boolean
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export const UserAuthContext = createContext<AuthContext>({
  // Session storage is used to set initial value in provider below
  isAuthenticated: false,
  // This function is replaced with a useState set dispatch in provider below
  setIsAuthenticated: () => {/* Do nothing */}
});

/* Use this provider to avoid duplication of isAuth logic */
export const UserAuthContextProvider = ({ children }: { children: ReactNode}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem(IS_AUTHENTICATED_TOKEN) === 'true'
  );

  useEffect(() => {
    sessionStorage.setItem(IS_AUTHENTICATED_TOKEN, `${isAuthenticated}`)
  }, [isAuthenticated]);

  return (
    <UserAuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </UserAuthContext.Provider>
  );
}
