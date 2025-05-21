import GlobalStyle from './GlobalStyles';
import { RouterProvider } from 'react-router-dom';
import router from './router';

function App() {
  return (
    <>
      <GlobalStyle />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
