import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { UserAuthContextProvider } from '@pet-store/shared/core/user/data-access';



export function App() {
  return (
    <UserAuthContextProvider>
      <RouterProvider router={router} />
    </UserAuthContextProvider>
  );
}

export default App;
