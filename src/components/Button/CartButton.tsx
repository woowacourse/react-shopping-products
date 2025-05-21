import { CartInfo } from "../../types";
import { useCartContext } from "../Context/CartProvider";
import S from "../ItemCard/ItemCard.module.css";

interface CartButtonProps {
	productId: number;
	cartInfo: CartInfo | null;
}

const CartButton = ({ productId, cartInfo }: CartButtonProps) => {
	const { updateCartItem } = useCartContext();

	if (cartInfo) {
		return (
			<button className={S.removeCartButton} onClick={() => updateCartItem("remove", cartInfo.id)}>
				<img className={S.cartImg} src="./images/remove-cart.svg" alt="장바구니 제거" />
				<p>빼기</p>
			</button>
		);
	}

	return (
		<button className={S.addCartButton} onClick={() => updateCartItem("add", productId)}>
			<img className={S.cartImg} src="./images/add-cart.svg" alt="장바구니 추가" />
			<p>담기</p>
		</button>
	);
};

export default CartButton;
