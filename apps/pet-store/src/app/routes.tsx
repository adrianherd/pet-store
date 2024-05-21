import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from 'react-router-dom';
import { BasicLayout } from '@pet-store/shared/layouts/basic-layout/ui';
import { Login } from '@pet-store/pet-store/pages/login/feat';
import { PetList } from '@pet-store/pet-store/pages/pet-list/feat';
import { ProtectedRoute } from '@pet-store/shared/guards/protected-route/data-access';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<BasicLayout />}>
      <Route index element={<Navigate to={'pet-list'} />}/>
      <Route path="login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="pet-list" element={<PetList />} />
      </Route>
    </Route>
  )
);
