import React from 'react';
import { Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout/MainLayout';
import Home from '../pages/Home/Home';

export interface Route {
  name: string;
  path: string;
  layout: React.FC;
  component: () => JSX.Element;
}

const routes: Route[] = [
  {
    name: 'not-found',
    path: '*',
    layout: MainLayout,
    component: () => <Navigate to='/' />,
  },
  {
    name: 'home',
    path: '/',
    layout: MainLayout,
    component: () => <Home />,
  },
];

export default routes;
