import { useShoppingContext } from "../../context/useShoppingContext";
import { Line } from "../../../../components/Line/Line";
import { CartProduct } from "../CartProduct/CartProduct";
import {
  CartProductContainerLayout,
  PaymentsLabel,
  PaymentsLayout,
  PaymentsValue,
} from "./CartProductContainer.style";
import { useCalculateTotalPrice } from "../../hooks/useCalculateTotalPrice";
import { useMemo } from "react";
import { CartItemType } from "../../apis/types/cartItem";
import { ProductType } from "../../apis/types/product";

type CartProductItem = {
  cartItem: CartItemType;
  productItem: ProductType;
};
export default function CartProductContainer() {
  const { cart, product, dispatch } = useShoppingContext();

  const cartProductItems: CartProductItem[] = useMemo(() => {
    console.log("장바구니 상품 목록을 계산합니다.");
    return cart.item
      .map((cartItem) => {
        const productItem = product.item.find(
          (productItem) => productItem.id === cartItem.product.id
        );
        return productItem ? { cartItem, productItem } : null;
      })
      .filter((item) => item !== null);
  }, [cart.item, product.item]);

  const totalPrice = useCalculateTotalPrice({
    cartItem: cart.item,
    productItem: product.item,
  });

  if (cart.item.length === 0)
    return (
      <div>
        장바구니에 추가된 목록이 없습니다. <br /> 상품을 먼저 추가해주세요
      </div>
    );

  return (
    <>
      <div css={CartProductContainerLayout}>
        {cartProductItems.map(({ cartItem, productItem }) => {
          return (
            <CartProduct
              key={productItem.id}
              id={cartItem.id}
              imageUrl={productItem.imageUrl}
              name={productItem.name}
              price={productItem.price}
              quantity={cartItem.quantity}
              onChange={() => dispatch({ type: "update", queryKey: "cart" })}
              maxQuantity={productItem.quantity ?? 100000}
            />
          );
        })}
      </div>
      <Line />
      <div css={PaymentsLayout}>
        <p css={PaymentsLabel}> 총 결제 금액</p>
        <p css={PaymentsValue}>{totalPrice.toLocaleString()}원</p>
      </div>
    </>
  );
}
