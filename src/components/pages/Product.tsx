import { useState } from 'react';
import useCart from '../../hooks/useCart';
import useProducts from '../../hooks/useProducts';
import Header from '../Header/Header';
import ItemCard from '../ItemCard/ItemCard';
import Skeleton from '../Skeleton/Skeleton';
import S from './Product.module.css';

const Product = () => {
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');

  const { products, loading, productError } = useProducts({
    filterType: filter,
    sortingType: sort,
  });
  const { cartProducts, fetchCartProducts, cartError } = useCart();

  const mergedData = products.map((product) => {
    const cart = cartProducts.find((item) => item.product.id === product.id);
    return cart
      ? { ...product, cartInfo: { id: cart.id, quantity: cart.quantity } }
      : { ...product, cartInfo: { id: -1, quantity: 0 } };
  });

  return (
    <div className={S.container}>
      <Header cartCount={cartProducts.length} error={{ productError, cartError }} />
      <div className={S.contentContainer}>
        <div className={S.contentTop}>
          <h1 className={S.title}>bpple 상품 목록</h1>
          <div className={S.dropdownContainer}>
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="">전체</option>
              <option value="식료품">식료품</option>
              <option value="패션잡화">패션잡화</option>
            </select>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="asc">낮은 가격순</option>
              <option value="desc">높은 가격순</option>
            </select>
          </div>
        </div>
        {loading ? (
          <Skeleton length={10} />
        ) : (
          <div className={S.itemContainer}>
            {mergedData?.map(({ id, imageUrl, name, price, cartInfo }) => (
              <ItemCard
                key={id}
                imageUrl={imageUrl}
                name={name}
                price={price}
                isCart={cartInfo.id !== -1}
                cartInfo={cartInfo}
                fetchCartProducts={fetchCartProducts}
                id={id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
