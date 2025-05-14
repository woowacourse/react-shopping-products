import ErrorToast from '../components/ErrorToast';
import ProductItem from '../components/ProductItem';
import { useEffect, useState } from 'react';
import Select from '../components/Select';
import styled from '@emotion/styled';
import { getProducts } from '../services/productServices';
import { ProductItemType } from '../types/data';
import tryApiCall from '../util/tryApiCall';
import { addCartItems, removeCartItems } from '../services/cartItemServices';
import { getCartId } from '../domain/manageCartInfo';
import useCartContext from '../hooks/useCartContext';
import { CATEGORY_OPTIONS, SELECT_SORT_OPTIONS, SORT_OPTIONS } from '../constants/systemConstants';

export const ProductListPage = () => {
  const [categoryOption, setCategoryOption] = useState(CATEGORY_OPTIONS[0]);
  const [sortOption, setSortOption] = useState('높은 가격순');
  const [products, setProducts] = useState<ProductItemType[]>([]);

  const {
    cartItemsIds,
    handleAddCartItemsIds,
    handleRemoveCartItemsIds,
    errorMessage,
    handleErrorMessage,
  } = useCartContext();
  console.log(sortOption);
  useEffect(() => {
    (async () => {
      const productsData = await tryApiCall(
        () => getProducts(categoryOption, SORT_OPTIONS.get(sortOption)),
        handleErrorMessage,
      );
      if (productsData) {
        setProducts(productsData);
      }
    })();
  }, [categoryOption, sortOption]);

  const handleCategoryOption = (value: string) => {
    setCategoryOption(value);
  };

  const handleSortOption = (value: string) => {
    setSortOption(value);
  };

  const handleAddCartItem = (id: number) => {
    const addItemInfo = {
      productId: id,
      quantity: 1,
    };
    (async () => {
      await tryApiCall(async () => await addCartItems(addItemInfo), handleErrorMessage);
      handleAddCartItemsIds(id);
    })();
  };

  const handleRemoveCartItem = (id: number) => {
    (async () => {
      await removeCartItems(await tryApiCall(async () => await getCartId(id), handleErrorMessage));
      handleRemoveCartItemsIds(id);
    })();
  };

  // const selectedValue = SORT_OPTIONS.get(sortOption) ?? 'desc';

  return (
    <ProductListPageContainer>
      {errorMessage.length !== 0 && <ErrorToast errorMessage={errorMessage} />}
      <Title>bpple 상품 목록</Title>
      <SelectContainer>
        <Select
          value={categoryOption}
          options={CATEGORY_OPTIONS}
          handleSelectedValue={(value) => handleCategoryOption(value)}
        />
        <Select
          value={sortOption}
          options={SELECT_SORT_OPTIONS}
          handleSelectedValue={(value) => handleSortOption(value)}
        />
      </SelectContainer>

      <ProductItemContainer>
        {products.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            isCartAdded={cartItemsIds.includes(product.id)}
            handleAddCartItem={handleAddCartItem}
            handleRemoveCartItem={handleRemoveCartItem}
          />
        ))}
      </ProductItemContainer>
    </ProductListPageContainer>
  );
};

const ProductListPageContainer = styled.div`
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Title = styled.h2`
  font-size: var(--font-size-title);
  font-weight: var(--font-weight-title);
`;

const SelectContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const ProductItemContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 20px;
  column-gap: 12px;
`;
