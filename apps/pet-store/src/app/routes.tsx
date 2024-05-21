import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from 'react-router-dom';
import { BasicLayout } from '@pet-store/shared/layouts/basic-layout/ui';
import { ProtectedRoute } from '@pet-store/shared/guards/protected-route/data-access';
import { lazy } from 'react';

// Lazy load major pages until the path is activated
const Login = lazy(() => import('@pet-store/pet-store/pages/login/feat').then(({ Login: FC }) => ({ default: FC })))
const PetList = lazy(() => import('@pet-store/pet-store/pages/pet-list/feat').then(({ PetList: FC })=> ({ default: FC })))

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
