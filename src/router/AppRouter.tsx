import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { PAGE_INFORMATION } from '../constants/page';
import ProductPage from '../components/page/ProductPage';

const router = createBrowserRouter([
  {
    path: '',
    element: <App />,
    children: [
      {
        path: PAGE_INFORMATION.main.path,
        element: <ProductPage />,
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
