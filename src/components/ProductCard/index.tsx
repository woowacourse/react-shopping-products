import AddButton from "../Button/AddButton";
import { CartItem, Product } from "../../types/product.type";
import ProductStepper from "../ProductStepper/ProductStepper";
import { useAPIContext } from "../../contexts/API/useAPIContext";
import getShoppingCart from "../../APIs/shoppingCart/getShoppingCart";
import addShoppingCart from "../../APIs/shoppingCart/addShoppingCart";
import Button from "../Button";
import { useState } from "react";
import updateCartItemQuantity from "../../APIs/shoppingCart/updateCartItemQuantity";
import {
  ButtonArea,
  CardFrame,
  CardImage,
  CardInfo,
  ImageFrame,
  ImageOverlay,
  ProductName,
} from "./style";
import { useErrorContext } from "../../contexts/Error/ErrorContext";

interface ProductCardProps {
  product: Product;
  cartItems: CartItem[];
  isInCart: boolean;
}

const ProductCard = ({ product, isInCart, cartItems }: ProductCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localQuantity, setLocalQuantity] = useState(
    cartItems.find((item) => item.product.id === product.id)?.quantity || 1
  );
  const { id, name, price, imageUrl } = product;
  const cartItem = cartItems.find((item) => item.product.id === id);
  const cartItemId = cartItem?.id;
  const soldOut =
    product.quantity !== undefined
      ? product.quantity === cartItem?.quantity
      : false; // product.quantity는 MSW에서만 제공

  const { refetch: refetchCart } = useAPIContext({
    name: "cartItems",
    fetcher: () => getShoppingCart({ endpoint: "/cart-items" }),
  });
  const { handleError } = useErrorContext();

  const handleAdd = async () => {
    try {
      const endpoint = "/cart-items";
      const requestBody = { productId: id, quantity: 1 };
      await addShoppingCart({ endpoint, requestBody });
      refetchCart();
    } catch (err) {
      handleError({
        isError: true,
        errorMessage: "장바구니에 추가하지 못했습니다.",
      });
    }
  };

  const handleUpdate = async () => {
    try {
      if (localQuantity > cartItem!.product.quantity)
        throw new Error(
          "현재 남은 수량은 " + cartItem!.product.quantity + "개 입니다."
        );
      await updateCartItemQuantity({
        endpoint: `/cart-items/${cartItemId}`,
        requestBody: {
          quantity: localQuantity,
        },
      });
      setIsEditing(false);
      refetchCart();
    } catch (err) {
      handleError({
        isError: true,
        errorMessage: "장바구니 수량 업데이트에 실패했습니다.",
      });
    }
  };

  return (
    <div key={id} className={CardFrame} data-testid="product-card">
      <div className={ImageFrame}>
        {soldOut && <div className={ImageOverlay}>품절</div>}
        <img
          src={imageUrl || "./default.png"}
          alt={name}
          className={CardImage}
          onError={(e) => {
            e.currentTarget.src = "./default.png";
          }}
        />
      </div>
      <div className={CardInfo}>
        <h4 className={ProductName} data-testid="product-name">
          {name}
        </h4>
        <p data-testid="product-price">{price.toLocaleString()}원</p>
        <div className={ButtonArea}>
          {isInCart ? (
            <>
              <ProductStepper
                quantity={localQuantity}
                onDecreaseQuantity={() =>
                  setLocalQuantity((prev) => (prev > 1 ? prev - 1 : 1))
                }
                onIncreaseQuantity={() => setLocalQuantity((prev) => prev + 1)}
                disabled={!isEditing}
              />
              {isEditing ? (
                <Button
                  title="✅ 확인"
                  onClick={handleUpdate}
                  textStyled={{ fontSize: "12px" }}
                  buttonStyled={{ width: "50px" }}
                />
              ) : (
                <Button
                  title="🛒 수량수정"
                  onClick={() => {
                    setLocalQuantity(cartItem?.quantity || 1);
                    setIsEditing(true);
                  }}
                  textStyled={{ fontSize: "12px" }}
                  buttonStyled={{ width: "auto", padding: "0 8px" }}
                />
              )}
            </>
          ) : (
            <AddButton onClick={handleAdd} disabled={false} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
