import useFetchProducts from './hooks/useFetchProducts';

function App() {
  const { products, isError, isPending } = useFetchProducts();

  return (
    <>
      <h1>React Shopping Products</h1>
      <div>
        isError:{isError}, isPending:{isPending}
      </div>
    </>
  );
}

export default App;
