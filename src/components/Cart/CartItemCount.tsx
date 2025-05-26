import { MergedProduct } from "../../types";
import CartCountButton from "../Button/CartCountButton";
import { useCartState } from "../Context/StoreContext";
import S from "./CartItemCount.module.css";

const CartItemCount = ({ mergedProduct }: { mergedProduct: MergedProduct }) => {
	const { updateCartItem } = useCartState();

	return (
		<div className={S.container}>
			<CartCountButton type="minus" mergedProduct={mergedProduct} onUpdate={updateCartItem} />
			<p className={S.cartQuantity}>{mergedProduct.cartInfo?.quantity}</p>
			<CartCountButton type="plus" mergedProduct={mergedProduct} onUpdate={updateCartItem} />
		</div>
	);
};

export default CartItemCount;
