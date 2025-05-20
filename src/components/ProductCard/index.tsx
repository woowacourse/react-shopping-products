import { css } from "@emotion/css";
import RemoveButton from "../Button/RemoveButton";
import AddButton from "../Button/AddButton";
import { Product } from "../../types/product.type";
import { useShoppingCartContext } from "../../contexts/shoppingCart/useShoppingCartContext";
import { useAddShoppingCart } from "../../hooks/shoppingCart/useAddShoppingCart";
import { useDeleteShoppingCart } from "../../hooks/shoppingCart/useDeleteShoppingCart";

interface ProductCardProps {
  product: Product;
  isInCart: boolean;
}

const ProductCard = ({ product, isInCart }: ProductCardProps) => {
  const { id, name, price, imageUrl } = product;
  const { cartItems } = useShoppingCartContext();
  const cartItemId = cartItems.find(
    (item) => item.product.id === product.id
  )?.id;

  const { handleAdd } = useAddShoppingCart(product.id);
  const { handleDelete } = useDeleteShoppingCart(cartItemId);
  const { isShoppingLoading } = useShoppingCartContext();

  return (
    <div key={id} className={CardFrame}>
      <div className={ImageFrame}>
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
        <p>{price.toLocaleString()}원</p>
        <div className={ButtonArea}>
          {isInCart ? (
            <RemoveButton onClick={handleDelete} disabled={isShoppingLoading} />
          ) : (
            <AddButton onClick={handleAdd} disabled={isShoppingLoading} />
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
