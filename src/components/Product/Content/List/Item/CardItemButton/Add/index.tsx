import Button from "@/components/Button";
import addCartItemIcon from "@/assets/icons/add-cart-item.svg";
import { addCartItems } from "@/apis/cartItems/addCartItems";
// import { getCartItems } from "@/apis/cartItems/getCartItems";
import useMutation from "@/hooks/useMutation";
// import { CartItemType } from "@/types/cartItem";
import AlertToast from "@/components/AlertToast";
import { useContext } from "react";
import { APIContext } from "@/context/APIContext";
import { getCartItems } from "@/apis/cartItems/getCartItems";

interface AddCartItemButton {
  id: number;
  disabled: boolean;
}

function AddCartItemButton({ id, disabled }: AddCartItemButton) {
  const { mutate, isLoading, error } = useMutation(() =>
    addCartItems({ productId: id, quantity: 1 })
  );

  const context = useContext(APIContext);

  if (!context) {
    throw new Error("AddCartItemButton must be used within a DataProvider");
  }

  const { setData } = context;

  const handleClick = async () => {
    if (disabled) return; // 선택적 방어 코드

    try {
      await mutate();
      const updatedCartItems = await getCartItems();

      setData((prev) => ({
        ...prev,
        cartItemData: updatedCartItems,
      }));
    } catch (error) {
      // mutate에서 에러가 발생한 경우 이후 로직을 실행하지 않게 try-catch문을 사용합니다.
    }
  };

  return (
    <>
      {error?.message && (
        <AlertToast key={error.message} type="error" message={error.message} />
      )}

      <Button
        variant="primary"
        type="button"
        onClick={handleClick}
        disabled={isLoading || disabled}
      >
        <img src={addCartItemIcon} alt="장바구니 담기" />
        담기
      </Button>
    </>
  );
}

export default AddCartItemButton;
