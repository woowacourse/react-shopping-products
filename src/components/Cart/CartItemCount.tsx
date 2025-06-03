import { MergedProduct } from "../../types";
import { useCartQuantity } from "../../hooks/useCartQuantity";
import PlusButton from "../Button/PlusButton";
import MinusButton from "../Button/MinusButton";
import S from "./CartItemCount.module.css";

const CartItemCount = ({ mergedProduct }: { mergedProduct: MergedProduct }) => {
	const { handleIncrease, handleDecrease, isIncreaseDisabled, quantity } = useCartQuantity({ mergedProduct });

	return (
		<div className={S.container}>
			<MinusButton onClick={handleDecrease} />
			<p className={S.cartQuantity}>{quantity}</p>
			<PlusButton onClick={handleIncrease} isDisabled={isIncreaseDisabled} />
		</div>
	);
};

export default CartItemCount;
