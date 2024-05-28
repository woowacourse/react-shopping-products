import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProductListPage from './pages/ProductListPage';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <ProductListPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
