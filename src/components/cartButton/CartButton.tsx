import { addItemToCart } from "./cartButton.domain";
import { useData } from "../../hooks/useData";
import { ERROR_TYPE } from "../../hooks/useError";
import { ButtonContainer } from "./CartButton.css";
import { useEffect } from "react";

interface CartToggleButtonProps {
  isToggled: boolean;
  setToggle: (val: boolean) => void;
  productId: number;
  cartId?: number;
  cartAmount: number;
  setErrorTrue: (type: ERROR_TYPE) => void;
}

function CartToggleButton({
  isToggled,
  setToggle,
  productId,
  cartId,
  cartAmount,
  setErrorTrue,
}: CartToggleButtonProps) {
  const { setCartItemIds, fetchCartProducts } = useData();

  const showCountButton = async () => {
    try {
      await addItemToCart({
        productId,
        cartAmount,
        syncCartWithServer: fetchCartProducts,
        setErrorTrue,
      });
      setToggle(!isToggled);
    } catch {
      console.log("추가실패");
    }
  };

  // const handleRemove = async () => {
  //   try {
  //     await removeItemToCart({
  //       cartId,
  //       productId,
  //       setCartItemIds,
  //       setErrorTrue,
  //     });
  //   } catch {
  //     console.log("삭제실패");
  //   }
  // };

  if (isToggled) {
    return (
      <>
        <button>-</button>
        <p>1</p>
        <button>+</button>
      </>
    );
  }

  return (
    <button css={ButtonContainer} onClick={showCountButton}>
      <img src="/addCart.svg" alt="담기 아이콘" />
      <p>담기</p>
    </button>
  );
}

export default CartToggleButton;
