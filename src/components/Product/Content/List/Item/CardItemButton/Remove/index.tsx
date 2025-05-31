import Button from "@/components/Button";
import { removeCartItem } from "@/apis/cartItems/removeCartItem";
import { getCartItems } from "@/apis/cartItems/getCartItems";
import useMutation from "@/hooks/useMutation";
import AlertToast from "@/components/AlertToast";
import { useContext } from "react";
import { APIContext } from "@/context/APIContext";

interface RemoveCartItemButton {
  id: number;
}

function RemoveCartItemButton({ id }: RemoveCartItemButton) {
  const { mutate, isLoading, error } = useMutation(() => removeCartItem(id));

  const context = useContext(APIContext);

  if (!context) {
    throw new Error("RemoveCartItemButton must be used within a DataProvider");
  }

  const { setData } = context;

  const handleClick = async () => {
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
        variant="outline"
        type="button"
        onClick={handleClick}
        disabled={isLoading}
      >
        삭제
      </Button>
    </>
  );
}

export default RemoveCartItemButton;
