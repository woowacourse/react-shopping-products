// import { useEffect } from 'react';
// import { getProducts } from './services/productServices';
import GlobalStyle from './GlobalStyles';
import { RouterProvider } from 'react-router-dom';
import router from './router';

function App() {
  // useEffect(() => {
  //   (async () => {
  //     const data = await getProducts();
  //     console.log(data);
  //   })();
  // }, []);
  return (
    <>
      <GlobalStyle />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
