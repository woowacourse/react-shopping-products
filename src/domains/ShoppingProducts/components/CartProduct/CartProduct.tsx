import Button from "../../../../components/Button/Button";
import { deleteCartItem } from "../../apis/cartItem";
import { useShoppingContext } from "../../context/useShoppingContext";
import { QuantitySelector } from "../QuantitySelector/QuantitySelector";
import {
  CartProductLayout,
  deleteButton,
  ProductImg,
  ProductName,
  ProductPrice,
  TitleLayout,
} from "./CartProduct.style";

interface CartProductProps {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  quantity: number;
  maxQuantity: number;
  onChange: () => void;
}

export function CartProduct({
  id,
  imageUrl,
  name,
  price,
  quantity,
  maxQuantity,
  onChange,
}: CartProductProps) {
  const { dispatch } = useShoppingContext();

  const handleDelete = async () => {
    try {
      await deleteCartItem({ id });
      onChange();
    } catch (error) {
      dispatch({
        type: "error",
        queryKey: "cart",
        payload: "장바구니 상품 삭제에 실패했습니다.",
      });
      console.error("장바구니 상품 삭제에 실패했습니다:", error);
    }
  };

  return (
    <section
      id={`cartProduct-${id}`}
      aria-label={`${id} 항목`}
      css={CartProductLayout}
      data-testid="cart-product"
    >
      <img src={imageUrl} css={ProductImg} />
      <div css={TitleLayout}>
        <p css={ProductName}>{name}</p>
        <p css={ProductPrice}>{price.toLocaleString()}원</p>
        <QuantitySelector
          quantity={quantity}
          cartId={id}
          onChange={onChange}
          maxQuantity={maxQuantity}
        />
      </div>
      <div css={deleteButton}>
        <Button onClick={handleDelete} style="ghost">
          삭제
        </Button>
      </div>
    </section>
  );
}
