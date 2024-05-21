import { Navigate, Outlet } from 'react-router-dom';
import { IS_AUTHENTICATED_TOKEN } from '@pet-store/shared/core/user/util';

export interface ProtectedRouteProps {
  redirectPath?: string,
  children?: React.ReactNode,
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
  if (sessionStorage.getItem(IS_AUTHENTICATED_TOKEN) !== 'true') {
    return <Navigate to={redirectPath} />
  }
  return children ? children : <Outlet />
}

export default ProtectedRoute;
