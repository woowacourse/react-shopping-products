import Header from '../components/Header/Header';
import ItemCard from '../components/ItemCard/ItemCard';
import Skeleton from '../components/Skeleton/Skeleton';
import S from './Product.module.css';
import CartModal from '../components/CartModal/CartModal';
import { useState } from 'react';
import useFetchData from '../hooks/useFetchData';

const Product = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    filter,
    setFilter,
    sort,
    setSort,
    cartLength,
    mergedData,
    productsLoading,
    handleCartProducts,
  } = useFetchData();

  return (
    <>
      <CartModal
        isOpen={isOpen}
        handleClose={() => {
          setIsOpen(false);
        }}
      />
      <Header onClickIcon={() => setIsOpen(true)} cartCount={cartLength} />
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
        {productsLoading ? (
          <Skeleton length={10} />
        ) : (
          <div className={S.itemContainer}>
            {mergedData?.map(({ id, imageUrl, name, price, quantity, cartInfo }) => (
              <ItemCard
                key={id}
                imageUrl={imageUrl}
                name={name}
                price={price}
                isCart={cartInfo.id !== -1}
                quantity={cartInfo.quantity}
                maxQuantity={quantity}
                onAddCart={() => handleCartProducts('add', { id })}
                onRemoveCart={() => handleCartProducts('remove', { id: cartInfo.id })}
                onPatchCart={(quantity: number) =>
                  handleCartProducts('patch', { id: cartInfo.id, quantity })
                }
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Product;
