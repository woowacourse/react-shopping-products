import Header from '../Header/Header';
import ItemCard from '../ItemCard/ItemCard';
import Skeleton from '../Skeleton/Skeleton';
import S from './Product.module.css';
import useProductPage from '../../hooks/useProductPage';

const Product = () => {
  const {
    filter,
    sort,
    setFilter,
    setSort,
    cartLength,
    mergedData,
    loading,
    handleAddCart,
    handleRemoveCart,
  } = useProductPage();

  return (
    <>
      <Header cartCount={cartLength} />
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
