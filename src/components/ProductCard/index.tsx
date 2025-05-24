import { css } from "@emotion/css";
import RemoveButton from "../Button/RemoveButton";
import AddButton from "../Button/AddButton";
import { CartItem, Product } from "../../types/product.type";
import ProductStepper from "../ProductStepper/ProductStepper";
import { useAPIContext } from "../../contexts/APIProvider/useAPIContext";
import getShoppingCart from "../../APIs/shoppingCart/getShoppingCart";
import addShoppingCart from "../../APIs/shoppingCart/addShoppingCart";
import deleteShoppingCart from "../../APIs/shoppingCart/deleteShoppingCart";

interface ProductCardProps {
  product: Product;
  cartItems: CartItem[];
  isInCart: boolean;
}

const ProductCard = ({ product, isInCart, cartItems }: ProductCardProps) => {
  const { id, name, price, imageUrl } = product;
  const cartItemId = cartItems.find(
    (item) => item.product.id === product.id
  )?.id;

  const { refetch: refetchCart } = useAPIContext({
    name: "cartItems",
    fetcher: () => getShoppingCart({ endpoint: "/cart-items" }),
  });

  const handleAdd = async () => {
    try {
      const endpoint = "/cart-items";
      const requestBody = { productId: id, quantity: 1 };
      await addShoppingCart({ endpoint, requestBody });
      refetchCart();
    } catch (err) {
      console.error("장바구니 추가 실패:", err);
    }
  };

  const handleDelete = async () => {
    try {
      const endpoint = "/cart-items";
      await deleteShoppingCart({ endpoint, cartItemId: cartItemId! });
      refetchCart();
    } catch (err) {
      console.error("장바구니 삭제 실패:", err);
    }
  };

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
          <ProductStepper
            quantity={5}
            onDecreaseQuantity={() => {}}
            onIncreaseQuantity={() => {}}
          />
          {isInCart ? (
            <RemoveButton onClick={handleDelete} disabled={false} />
          ) : (
            <AddButton onClick={handleAdd} disabled={false} />
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
  justify-content: space-between;
`;
