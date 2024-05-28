import { Global } from "@emotion/react";
import { baseStyle } from "../style/baseStyle";

import styled from "@emotion/styled";

import Header from "../components/Header";
import ProductCard from "../components/product/ProductCard";
import Dropdown from "../components/Dropdown";
import MainTitle from "../components/MainTitle";

const S = {
  MainMall: styled.div`
    padding: 36px 24px;

    display: flex;
    flex-direction: column;
    gap: 24px;
  `,
  Toolbar: styled.div`
    display: flex;
    justify-content: space-between;
  `,
  ProductList: styled.div`
    display: grid;
    grid-template-columns: repeat(2, 183px);
    gap: 16px;
  `,
};

const Mall = () => {
  const options = ["전체", "러기", "헤인"];

  const product = {
    id: 0,
    name: "스마트폰",
    price: 699,
    imageUrl: "https://via.placeholder.com/150/0000FF/808080?text=스마트폰",
    category: "Electronics",
    description: "hi",
  };

  const productList = Array.from({ length: 8 }, (_, idx) => ({ ...product, name: product.name + idx }));

  return (
    <>
      <Global styles={baseStyle} />
      <Header />

      <S.MainMall>
        <MainTitle>러기의 쇼핑몰</MainTitle>
        <S.Toolbar>
          <Dropdown options={options} />
          <Dropdown options={options} />
        </S.Toolbar>
        <S.ProductList>
          {productList.map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </S.ProductList>
      </S.MainMall>
    </>
  );
};

export default Mall;
