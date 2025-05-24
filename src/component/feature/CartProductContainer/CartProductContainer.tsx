import { useShoppingContext } from "../../../context/useShoppingContext";
import { Line } from "../../unit/Line/Line";
import { CartProduct } from "../CartProduct/CartProduct";
import {
  CartProductContainerLayout,
  PaymentsLabel,
  PaymentsLayout,
  PaymentsValue,
} from "./CartProductContainer.style";

export default function CartProductContainer() {
  const { cartItemList, productList, dispatch } = useShoppingContext();

  if (cartItemList.length === 0)
    return (
      <div>
        장바구니에 추가된 목록이 없습니다. <br /> 상품을 먼저 추가해주세요
      </div>
    );

  return (
    <>
      <div css={CartProductContainerLayout}>
        {cartItemList.map((cartItem) => {
          const cartProduct = productList.filter(
            (product) => cartItem.product.id === product.id
          );
          if (cartProduct.length === 0) return;
          return (
            <CartProduct
              key={cartProduct[0].id}
              id={cartItem.id}
              imageUrl={cartProduct[0].imageUrl}
              name={cartProduct[0].name}
              price={cartProduct[0].price}
              quantity={cartItem.quantity}
              onChange={() => dispatch({ type: "updateCartProduct" })}
            />
          );
        })}
      </div>
      <Line />
      <div css={PaymentsLayout}>
        <p css={PaymentsLabel}> 총 결제 금액</p>
        <p css={PaymentsValue}>95,000원</p>
      </div>
    </>
  );
}
