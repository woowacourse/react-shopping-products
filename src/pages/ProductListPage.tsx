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

export const ProductListPage = () => {
  //임시
  const options = ['옵션1', '옵션2', '옵션3', '옵션4', '옵션5'];
  const [value, setValue] = useState(options[0]);
  const [products, setProducts] = useState<ProductItemType[]>([]);

  const {
    cartItemsIds,
    handleAddCartItemsIds,
    handleRemoveCartItemsIds,
    errorMessage,
    handleErrorMessage,
  } = useCartContext();

  useEffect(() => {
    (async () => {
      const productsData = await tryApiCall(getProducts, handleErrorMessage);
      if (productsData) {
        setProducts(productsData);
      }
    })();
  }, []);

  const handleSelectedValue = (value: string) => {
    setValue(value);
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

  return (
    <ProductListPageContainer>
      {errorMessage.length !== 0 && <ErrorToast errorMessage={errorMessage} />}
      <Title>bpple 상품 목록</Title>
      <SelectContainer>
        <Select
          value={value}
          options={options}
          handleSelectedValue={(value: string) => handleSelectedValue(value)}
        />
        <Select
          value={value}
          options={options}
          handleSelectedValue={(value: string) => handleSelectedValue(value)}
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
