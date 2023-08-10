import PrivateRouter from '../router/PrivateRoute';

import { LazyExoticComponent, lazy } from 'react';

const Dashboard = lazy(() => import('@/views/dashboard'));
const AddProduct = lazy(() => import('@/views/products/Add'));
const ListProduct = lazy(() => import('@/views/products/List'));

export const newRouter = (NewComponent: LazyExoticComponent<() => JSX.Element>, useAuth = true): JSX.Element => {
  return useAuth ? (
    <PrivateRouter>
      <NewComponent />
    </PrivateRouter>
  ) : (
    <NewComponent />
  );
};

const routes = [
  {
    index: true,
    element: newRouter(Dashboard),
    path: '/',
  },
  {
    index: false,
    element: newRouter(AddProduct),
    path: '/products/add-product',
  },
  {
    index: false,
    element: newRouter(ListProduct),
    path: '/products/list-product',
  },
];

export default routes;
