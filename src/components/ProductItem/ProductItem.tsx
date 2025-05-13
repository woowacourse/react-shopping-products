import {
  ProductContainer,
  ProductImage,
  ProductName,
  ProductPrice,
  ProductWrapper,
} from "./ProductItem.styles";

const ProductItem = () => {
  return (
    <ProductContainer>
      <ProductImage $url="https://content.surfit.io/thumbs/image/3N4Pw/0A4L9/116325713668224bd83dd1f.png/cover-center-2x.webp"></ProductImage>
      <ProductWrapper>
        <ProductName>이름</ProductName>
        <ProductPrice>가격</ProductPrice>
        {/* <AddCartButton></AddCartButton> */}
      </ProductWrapper>
    </ProductContainer>
  );
};

export default ProductItem;
