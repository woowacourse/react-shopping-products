import Button from "../../../../components/Button/Button";
import { postCartItem } from "../../apis/cartItem";

interface ProductActionButtonProps {
  productQuantity: number;
  onChange: () => void;
  productId: number;
}

export function ProductActionButton({
  productQuantity,
  onChange,
  productId,
}: ProductActionButtonProps) {
  const handleAddCart = async (id: number) => {
    try {
      await postCartItem({ productId: id, quantity: 1 });
      onChange();
    } catch (error) {
      console.error("장바구니에 상품을 추가하는데 실패했습니다:", error);
      return;
    }
  };

  if (productQuantity === 0) {
    <Button
      onClick={() => handleAddCart(productId)}
      dataTestid="remove-cart-button"
      style="secondary"
      disabled
    >
      <img src="./remove-shopping-cart.svg" />
      <p>품절</p>
    </Button>;
  }

  return (
    <Button
      onClick={() => handleAddCart(productId)}
      dataTestid="add-cart-button"
    >
      <img src="./add-shopping-cart.svg" />
      <p>담기</p>
    </Button>
  );
}
