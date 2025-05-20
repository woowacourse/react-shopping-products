import styled from '@emotion/styled';
import SelectBox from '../Common/SelectBox';
import { ProductTypes } from '../../types/ProductTypes';
import { useState } from 'react';
import getProducts from '../../api/getProducts';

interface ProductListToolbarProps {
  setProducts: (products: ProductTypes[]) => void;
}

export default function ProductListToolbar({
  setProducts,
}: ProductListToolbarProps) {
  const CATEGORY = [
    { name: '전체', value: 'all' },
    { name: '식료품', value: 'grocery' },
    { name: '패션잡화', value: 'fashion' },
  ];
  const PRICE = [
    { name: '낮은 가격순', value: 'low' },
    { name: '높은 가격순', value: 'high' },
  ];

  const [categoryValue, setCategoryValue] = useState('');
  const [priceValue, setPriceValue] = useState('');

  const handleCategoryChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = e.target;
    try {
      const productsData = await getProducts(value === '전체' ? '' : value, {
        page: 0,
        size: 20,
        sort: priceValue === '낮은 가격순' ? 'price,asc' : 'price,desc',
      });
      const productsContent = productsData.content;
      setProducts(productsContent);
    } catch (e) {
      //
    } finally {
      //
    }

    setCategoryValue(value);
  };

  const handlePriceChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    try {
      const productsData = await getProducts(
        categoryValue === '전체' ? '' : categoryValue,
        {
          page: 0,
          size: 20,
          sort: value === '낮은 가격순' ? 'price,asc' : 'price,desc',
        }
      );
      const productsContent = productsData.content;
      setProducts(productsContent);
    } catch (e) {
      //
    } finally {
      //
    }

    setPriceValue(value);
  };

  return (
    <Container>
      <Title>bpple 상품 목록</Title>
      <SelectBoxContainer>
        <FirstSelectWrapper>
          <Label htmlFor="category">카테고리</Label>
          <SelectBox
            value={categoryValue}
            onChange={handleCategoryChange}
            category={CATEGORY}
            name="category"
            id="category"
          />
        </FirstSelectWrapper>
        <div>
          <Label htmlFor="price">가격</Label>
          <SelectBox
            value={priceValue}
            onChange={handlePriceChange}
            category={PRICE}
            name="price"
            id="price"
          />
        </div>
      </SelectBoxContainer>
    </Container>
  );
}

const SelectBoxContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 27px;
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: 24px;
  margin: 0px;
`;

const Label = styled.label`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

const FirstSelectWrapper = styled.div`
  display: flex;
`;
