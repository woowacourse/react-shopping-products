import ProductControls from "../../domain/ProductControls";
import S from "./styledComponent";

function CartItem({ product }) {
  return (
    <S.CartItemContainer>
      <S.ProductImage src="https://via.placeholder.com/80" alt={product.name} />
      <S.ProductDetailContainer>
        <S.ProductDetail>
          <S.NamePrice>
            <S.Name>{product.name}</S.Name>
            <S.Price>{`${product.price.toLocaleString()}원`}</S.Price>
          </S.NamePrice>
          <S.DeleteButton
            onClick={() => {
              /*TODO: 삭제 버튼 */
            }}
          >
            삭제
          </S.DeleteButton>
        </S.ProductDetail>

        {/*<-- 수량 조절 --> */}
        <ProductControls />
      </S.ProductDetailContainer>
    </S.CartItemContainer>
  );
}

export default CartItem;
