import styled from "styled-components";
import ProductItem from "./ProductItem";

const ProductList = () => {
  return (
    <S.Container>
      <S.Title>bpple 상품 목록</S.Title>
      <S.SelectContainer>
        <S.Select>
          <S.Option>전체</S.Option>
        </S.Select>
        <S.Select>
          <S.Option>낮은 가격순</S.Option>.
        </S.Select>
      </S.SelectContainer>
      <S.ItemContainer>
        <ProductItem></ProductItem>
        <ProductItem></ProductItem>
        <ProductItem></ProductItem>
        <ProductItem></ProductItem>
        <ProductItem></ProductItem>
        <ProductItem></ProductItem>
      </S.ItemContainer>
    </S.Container>
  );
};

export default ProductList;

const S = {
  Container: styled.main`
    display: flex;
    flex-direction: column;
  `,
  Title: styled.h2`
    font-weight: bold;
  `,
  SelectContainer: styled.div`
    display: flex;
    justify-content: space-between;
  `,
  Select: styled.select``,
  Option: styled.option``,

  ItemContainer: styled.section`
    display: flex;
    flex-wrap: wrap;
  `,
};
