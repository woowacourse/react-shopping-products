import { MergedProduct } from "../types";
import { useCart } from "./useCart";
interface UseCartQuantityProps {
	mergedProduct: MergedProduct;
}

export const useCartQuantity = ({ mergedProduct }: UseCartQuantityProps) => {
	const { handleRemoveFromCart, handleUpdateQuantity } = useCart();
	const handleIncrease = () => {
		if (!mergedProduct.id || !mergedProduct.quantity) return;
		handleUpdateQuantity(mergedProduct.id, mergedProduct.quantity + 1);
	};

	const handleDecrease = () => {
		if (!mergedProduct.id || !mergedProduct.quantity) return;

		if (mergedProduct.quantity === 1) {
			handleRemoveFromCart(mergedProduct.id);
			return;
		}

		handleUpdateQuantity(mergedProduct.id, mergedProduct.quantity - 1);
	};

	const checkIncreaseDisabled = () => {
		if (mergedProduct.quantity) {
			return mergedProduct.product.quantity <= mergedProduct.quantity;
		}

		return true;
	};

	return {
		handleIncrease,
		handleDecrease,
		isIncreaseDisabled: checkIncreaseDisabled(),
		quantity: mergedProduct.quantity ?? 0,
	};
};
