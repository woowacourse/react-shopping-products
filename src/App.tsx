import { useEffect } from 'react';
import getProducts from './getProducts';

function App() {
  useEffect(() => {
    const fetchData = async () => {
      const data = await getProducts();
      console.log(data.content.slice(0,20))
    };

    fetchData();
  }, []);

  return (
    <>
      <h1>React Shopping Products</h1>
    </>
  );
}

export default App;
