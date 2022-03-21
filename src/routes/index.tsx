import React from 'react';
import { Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout/MainLayout';
import Home from '../pages/Home/Home';
import Order from '../pages/Order/Order';

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
  {
    name: 'order',
    path: '/order',
    layout: MainLayout,
    component: () => <Order />,
  },
];

export default routes;
