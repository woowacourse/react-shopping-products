import AddButton from "../Button/AddButton";
import { CartItem, Product } from "../../types/product.type";
import { useAPIContext } from "../../contexts/API/useAPIContext";
import getShoppingCart from "../../APIs/shoppingCart/getShoppingCart";
import addShoppingCart from "../../APIs/shoppingCart/addShoppingCart";
import {
  ButtonArea,
  CardFrame,
  CardImage,
  CardInfo,
  CurrentQuantity,
  ImageFrame,
  ImageOverlay,
  ProductName,
} from "./style";
import { useErrorContext } from "../../contexts/Error/ErrorContext";
import Stepper from "../Stepper";
import { useCartItemQuantity } from "../../hooks/useCartItemQuantity";

interface ProductCardProps {
  product: Product;
  isInCart: boolean;
}

const ProductCard = ({ product, isInCart }: ProductCardProps) => {
  const { id, name, price, imageUrl } = product;
  const { data: cartItems, refetch: refetchCart } = useAPIContext<CartItem[]>({
    name: "cartItems",
    fetcher: () => getShoppingCart({ endpoint: "/cart-items" }),
  });

  const cartItem = cartItems?.find((item) => item.product.id === product.id);
  const { isLoading, localQuantity, handleOnIncrease, handleOnDecrease } =
    useCartItemQuantity(cartItem);
  const soldOut = product.quantity === 0;

  const { handleError } = useErrorContext();

  const handleAdd = async () => {
    try {
      const requestBody = { productId: id, quantity: 1 };
      await addShoppingCart({ endpoint: "/cart-items", requestBody });
      refetchCart();
    } catch (err) {
      handleError({
        isError: true,
        errorMessage: "장바구니에 추가하지 못했습니다.",
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
        <p className={CurrentQuantity}>⚠️ {product.quantity}개 남았어요</p>
        <div className={ButtonArea}>
          {isInCart ? (
            <Stepper
              quantity={localQuantity}
              onDecreaseQuantity={handleOnDecrease}
              onIncreaseQuantity={handleOnIncrease}
              isLoading={isLoading}
            />
          ) : (
            <AddButton onClick={handleAdd} disabled={soldOut} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
