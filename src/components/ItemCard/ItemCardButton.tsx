import CartButton from "../Button/CartButton";
import S from "./ItemCard.module.css";
import CartItemCount from "../Cart/CartItemCount";
import { MergedProduct } from "../../types";
import { useCart } from "../../hooks/useCart";

const ItemCardButton = ({ mergedProduct }: { mergedProduct: MergedProduct }) => {
	const { handleAddToCart } = useCart();
	return mergedProduct.id ? (
		<CartItemCount mergedProduct={mergedProduct} />
	) : (
		<CartButton
			onClick={() => {
				if (mergedProduct.product.quantity !== 0) handleAddToCart(mergedProduct.product.id);
			}}
			icon="./images/add-cart.svg"
			text="담기"
			className={S.addCartButton}
		/>
	);
};
export default ItemCardButton;
