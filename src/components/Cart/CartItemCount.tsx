import { MergedProduct } from "../../types";
import { useCartState } from "../Context/StoreContext";
import { useCartQuantity } from "../../hooks/useCartQuantity";
import PlusButton from "../Button/PlusButton";
import MinusButton from "../Button/MinusButton";
import S from "./CartItemCount.module.css";

const CartItemCount = ({ mergedProduct }: { mergedProduct: MergedProduct }) => {
	const { updateCartItem } = useCartState();
	const { handleIncrease, handleDecrease, isIncreaseDisabled, isDecreaseDisabled, quantity } = useCartQuantity({ mergedProduct, onUpdate: updateCartItem });

	return (
		<div className={S.container}>
			<MinusButton onClick={handleDecrease} isDisabled={isDecreaseDisabled} />
			<p className={S.cartQuantity}>{quantity}</p>
			<PlusButton onClick={handleIncrease} isDisabled={isIncreaseDisabled} />
		</div>
	);
};

export default CartItemCount;
