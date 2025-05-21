import { useState } from 'react';
import useCart from '../../hooks/useCart';
import useProducts from '../../hooks/useProducts';
import Header from '../Header/Header';
import ItemCard from '../ItemCard/ItemCard';
import Skeleton from '../Skeleton/Skeleton';
import S from './Product.module.css';
import useError from '../../hooks/useError';
import { getMergedData } from '../../utils';
import { addCart, removeCart } from '../../utils/api';

const Product = () => {
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');
  const { showError } = useError();

  const { products, loading } = useProducts({
    filterType: filter,
    sortingType: sort,
  });
  const { cartProducts, fetchCartProducts } = useCart();

  const mergedData = getMergedData(products, cartProducts);

  const handleAddCart = async (id: number) => {
    try {
      await addCart(id);
      await fetchCartProducts();
    } catch (e) {
      showError('장바구니 추가 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const handleRemoveCart = async (id: number) => {
    try {
      await removeCart(id);
      await fetchCartProducts();
    } catch (e) {
      showError('장바구니 삭제 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <>
      <Header cartCount={cartProducts.length} />
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
                onAddCart={() => handleAddCart(id)}
                onRemoveCart={() => handleRemoveCart(cartInfo.id)}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Product;
