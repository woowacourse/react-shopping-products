import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProductListPage from './pages/ProductListPage/ProductListPage';

import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/Global.style';
import theme from './styles/theme';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <ProductListPage />,
    },
  ]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
