import ErrorToast from '../components/ErrorToast';
import ProductItem from '../components/ProductItem';
import { useEffect, useState } from 'react';
import Select from '../components/Select';
import styled from '@emotion/styled';
import { getProducts } from '../services/productServices';
import { ProductItemType } from '../types/data';

export const ProductListPage = () => {
  const [errorOpen, setErrorOpen] = useState(false);
  const options = ['옵션1', '옵션2', '옵션3', '옵션4', '옵션5'];
  const [value, setValue] = useState(options[0]);
  const [products, setProducts] = useState<ProductItemType[]>([]);

  const handleSelectedValue = (value: string) => {
    setValue(value);
  };

  useEffect(() => {
    (async () => {
      const productsData = await getProducts();
      setProducts(productsData);
    })();
  }, []);

  useEffect(() => {
    setErrorOpen(true);
    setTimeout(() => {
      setErrorOpen(false);
    }, 3000);
    setValue('선택된 값');
  }, []);

  return (
    <ProductListPageContainer>
      {errorOpen && <ErrorToast errorMessage="hi" />}
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
          <ProductItem key={product.id} product={product} />
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
