import { css } from "@emotion/css";
import RemoveButton from "../Button/RemoveButton";
import AddButton from "../Button/AddButton";
import { Product } from "../../types/product.type";
import addShoppingCart from "../../APIs/addShoppingCart";
import { useShoppingCartContext } from "../../contexts/useShoppingCartContext";
import { useCallback } from "react";
import deleteShoppingCart from "../../APIs/deleteShoppingCart";

interface ProductCardProps {
  product: Product;
  isInCart: boolean;
}

const ProductCard = ({ product, isInCart }: ProductCardProps) => {
  const { id, name, price, imageUrl } = product;
  const { cartItems, handleCartItemChange, handleShoppingCartError } =
    useShoppingCartContext();
  const cartItemId = cartItems.find(
    (item) => item.product.id === product.id
  )?.id;

  const handleAddButton = useCallback(async () => {
    const endpoint = "/cart-items";
    const requestBody = {
      productId: id,
      quantity: 1,
    };

    if (cartItems.length === 50) {
      handleShoppingCartError({
        isError: true,
        errorMessage: "장바구니에 담을 수 있는 최대 수량은 50개입니다.",
      });
      return;
    }

    try {
      const newCardItem = await addShoppingCart({ endpoint, requestBody });
      handleCartItemChange(newCardItem);
    } catch (error) {
      if (error instanceof Error) {
        handleShoppingCartError({
          isError: true,
          errorMessage: "장바구니에 추가하지 못했습니다. 다시 시도해주세요.",
        });
      }
    }
  }, [id, handleCartItemChange, handleShoppingCartError, cartItems.length]);

  const handleRemoveButton = useCallback(async () => {
    const endpoint = `/cart-items`;

    try {
      const newCardItem = await deleteShoppingCart({ endpoint, cartItemId });
      handleCartItemChange(newCardItem);
    } catch (error) {
      if (error instanceof Error) {
        handleShoppingCartError({
          isError: true,
          errorMessage: "장바구니에서 삭제하지 못했습니다. 다시 시도해주세요.",
        });
      }
    }
  }, [cartItemId, handleCartItemChange, handleShoppingCartError]);

  return (
    <div key={id} className={CardFrame}>
      <div className={ImageFrame}>
        <img src={imageUrl} alt={name} className={CardImage} />
      </div>
      <div className={CardInfo}>
        <h4 className={ProductName}>{name}</h4>
        <p>{price.toLocaleString()}원</p>
        <div className={ButtonArea}>
          {isInCart ? (
            <RemoveButton onClick={handleRemoveButton} />
          ) : (
            <AddButton onClick={handleAddButton} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

const CardFrame = css`
  width: 100%;
  height: 224px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const ImageFrame = css`
  width: 182px;
  height: 112px;
`;

const CardImage = css`
  width: 100%;
  height: 100%;
  border: none;
  object-fit: cover;
`;

const CardInfo = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 16px 8px 8px 8px;
  gap: 8px;
`;

const ProductName = css`
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ButtonArea = css`
  display: flex;
  justify-content: flex-end;
`;
