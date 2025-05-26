import CartButton from "../Button/CartButton";
import S from "./ItemCard.module.css";
import CartItemCount from "../Cart/CartItemCount";
import { MergedProduct } from "../../types";
import { useStoreContext } from "../Context/StoreContext";

const ItemCardButton = ({ mergedProduct }: { mergedProduct: MergedProduct }) => {
	const { updateCartItem } = useStoreContext();

	return mergedProduct.cartInfo ? (
		<CartItemCount mergedProduct={mergedProduct} />
	) : (
		<CartButton onClick={() => mergedProduct.quantity !== 0 && updateCartItem("add", mergedProduct.id)} icon="./images/add-cart.svg" text="담기" className={S.addCartButton} />
	);
};
export default ItemCardButton;
