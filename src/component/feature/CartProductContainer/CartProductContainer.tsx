import { useShoppingContext } from "../../../hook/useContext/useShoppingContext";
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
