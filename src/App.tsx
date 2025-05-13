import { useEffect } from 'react';
import { getProducts } from './services/productServices';

function App() {
  useEffect(() => {
    (async () => {
      const data = await getProducts();
      console.log(data);
    })();
  }, []);
  return <h1>this is App</h1>;
}

export default App;
