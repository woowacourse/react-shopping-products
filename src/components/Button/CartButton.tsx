import { useEffect, useState } from "react";
import { getCartCounts } from "../../api/cart";
import { ShoppingCartIcon } from "../../assets";
import { BaseButton } from "./BaseButton";
import { StyledCartButtonImg, StyledCartCount, StyledContainer } from "./CartButton.styled";

interface CartButtonProps {
  onClick?: () => void;
}

export const CartButton = ({ onClick = () => {} }: CartButtonProps) => {
  const [productCount, setProductCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchCartCounts = async () => {
      try {
        const count = await getCartCounts();
        setProductCount(count);
      } catch (error) {
        console.error("Failed to fetch cart counts", error);
        setProductCount(null);
      }
    };

    fetchCartCounts();
  }, [productCount]);

  return (
    <BaseButton onClick={onClick}>
      <StyledContainer>
        <StyledCartButtonImg src={ShoppingCartIcon} />
        {productCount !== null && <StyledCartCount>{productCount}</StyledCartCount>}
      </StyledContainer>
    </BaseButton>
  );
};
