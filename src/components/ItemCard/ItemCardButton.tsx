import { CartInfo } from "../../types";
import CartButton from "../Button/CartButton";
import { useCartContext } from "../Context/CartProvider";
import S from "./ItemCard.module.css";

interface ItemCardButtonProps {
	productId: number;
	cartInfo: CartInfo | null;
}

const ItemCardButton = ({ productId, cartInfo }: ItemCardButtonProps) => {
	const { updateCartItem } = useCartContext();

	if (cartInfo) {
		return <CartButton onClick={() => updateCartItem("remove", cartInfo.id)} icon="./images/remove-cart.svg" text="빼기" className={S.removeCartButton} />;
	}

	return <CartButton onClick={() => updateCartItem("add", productId)} icon="./images/add-cart.svg" text="담기" className={S.addCartButton} />;
};

export default ItemCardButton;
