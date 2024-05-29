import { useEffect, useRef } from 'react';

import useProductList from './hooks/useProductList';

function App() {
  const {
    productList,
    isLoading,
    fetchNextPage,
    handleChangeCategory,
    handleChangeSort,
    order,
    category,
  } = useProductList();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onIntersect = (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && !isLoading) {
        fetchNextPage();
      }
    };

    const options = {
      rootMargin: '0px 0px 30% 0px',
    };

    const io = new IntersectionObserver(onIntersect, options);

    if (bottomRef.current) {
      io.observe(bottomRef.current);
    }

    return () => {
      if (bottomRef.current) {
        io.unobserve(bottomRef.current);
      }
    };
  }, [isLoading, fetchNextPage]);

  return (
    <>
      <h1>React Shopping Products</h1>
      <select value={category} onChange={handleChangeCategory}>
        <option value="fashion">fashion</option>
        <option value="beverage">beverage</option>
        <option value="electronics">electronics</option>
        <option value="kitchen">kitchen</option>
        <option value="fitness">fitness</option>
        <option value="books">books</option>
      </select>
      <select value={order} onChange={handleChangeSort}>
        <option value="asc">가격 낮은 순</option>
        <option value="desc">가격 높은 순</option>
      </select>
      <div>
        {productList.map((product, idx) => (
          <div key={idx}>
            <div>{product.category}</div>
            <img src={product.imageUrl} width={100} height={100} />
            <div>{product.name}</div>
            <div>{product.price}</div>
            <hr></hr>
          </div>
        ))}
      </div>
      <div ref={bottomRef} style={{ height: 100, backgroundColor: 'red' }}></div>
    </>
  );
}

export default App;
