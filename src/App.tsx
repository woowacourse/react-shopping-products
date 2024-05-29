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
      <div ref={bottomRef} style={{ height: 100, backgroundColor: 'red' }}></div>
    </>
  );
}

export default App;
