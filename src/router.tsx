import { createBrowserRouter } from 'react-router-dom';
import Layout from './pages/Layout';
import { ProductListPage } from './pages/ProductListPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <ProductListPage />,
      },
    ],
  },
]);

export default router;
