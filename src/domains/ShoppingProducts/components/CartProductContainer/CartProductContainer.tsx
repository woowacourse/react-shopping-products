import { useShoppingContext } from "../../context/useShoppingContext";
import { Line } from "../../../../components/Line/Line";
import { CartProduct } from "../CartProduct/CartProduct";
import {
  CartProductContainerLayout,
  PaymentsLabel,
  PaymentsLayout,
  PaymentsValue,
} from "./CartProductContainer.style";

export default function CartProductContainer() {
  const { cart, product, dispatch } = useShoppingContext();

  if (cart.item.length === 0)
    return (
      <div>
        장바구니에 추가된 목록이 없습니다. <br /> 상품을 먼저 추가해주세요
      </div>
    );

  const calculateTotalPrice = () => {
    return cart.item.reduce((total, cartItem) => {
      const productItem = product.item.find(
        (productItem) => productItem.id === cartItem.product.id
      );
      if (productItem) {
        return total + productItem.price * cartItem.quantity;
      }
      return total;
    }, 0);
  };

  return (
    <>
      <div css={CartProductContainerLayout}>
        {cart.item.map((cartItem) => {
          const cartProduct = product.item.filter(
            (productItem) => cartItem.product.id === productItem.id
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
              onChange={() => dispatch({ type: "update", queryKey: "cart" })}
              maxQuantity={cartProduct[0].quantity ?? 100000}
            />
          );
        })}
      </div>
      <Line />
      <div css={PaymentsLayout}>
        <p css={PaymentsLabel}> 총 결제 금액</p>
        <p css={PaymentsValue}>{calculateTotalPrice().toLocaleString()}원</p>
      </div>
    </>
  );
}
