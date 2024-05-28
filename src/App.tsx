import useProducts from './hooks/useProducts';

function App() {
  const { products, fetchNextPage, loading } = useProducts();
  if (loading) {
    return <div>로딩</div>;
  }

  return (
    <>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name}</li> // key 추가 및 return 명시
        ))}
      </ul>
      <button onClick={fetchNextPage}>다음 페이지</button>
    </>
  );
}

export default App;
