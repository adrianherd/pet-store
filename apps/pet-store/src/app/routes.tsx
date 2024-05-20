import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { BasicLayout } from '@pet-store/shared/layouts/basic-layout/ui';
import { Login } from '@pet-store/pet-store/pages/login/feat';
import { PetList } from '@pet-store/pet-store/pages/pet-list/feat';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<BasicLayout />}>
      <Route path="login" element={<Login />} />
      <Route path="pet-list" element={<PetList />} />
    </Route>
  )
);
