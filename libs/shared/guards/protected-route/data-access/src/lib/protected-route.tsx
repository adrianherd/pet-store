import { Navigate, Outlet } from 'react-router-dom';
import { ReactNode, useContext } from 'react';
import { UserAuthContext } from '@pet-store/shared/core/user/data-access';

export interface ProtectedRouteProps {
  redirectPath?: string,
  children?: ReactNode,
}

/*
  ProtectedRoute ensure that the user has already authenticated before allowing
  access to the routes.

  Children allows ProtectedRoute to be used as a Wrapper/HoC for a component:
    <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
    <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
  Outlet allows ProtectedRoute to be used as a 'layout' element for Route:
    <Route element={<ProtectedRoute />}>
      {// These children routes are now protected }
      <Route path="/home" element={<Home />} />
      <Route path="/admin" element={<Admin />} />
    </Route>
 */
export function ProtectedRoute({ redirectPath = '/login', children }: ProtectedRouteProps) {
  const { isAuthenticated } = useContext(UserAuthContext);
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} />
  }
  return children ? children : <Outlet />
}

export default ProtectedRoute;
