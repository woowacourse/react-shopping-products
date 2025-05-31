import { MergedProduct } from "../types";

interface UseCartQuantityProps {
	mergedProduct: MergedProduct;
	onUpdate: (type: string, id: number, quantity?: number) => void;
}

export const useCartQuantity = ({ mergedProduct, onUpdate }: UseCartQuantityProps) => {
	const handleIncrease = () => {
		if (!mergedProduct.cartInfo) return;
		onUpdate("change", mergedProduct.cartInfo.id, mergedProduct.cartInfo.quantity + 1);
	};

	const handleDecrease = () => {
		if (!mergedProduct.cartInfo) return;

		if (mergedProduct.cartInfo.quantity === 1) {
			onUpdate("remove", mergedProduct.cartInfo.id);
			return;
		}

		onUpdate("change", mergedProduct.cartInfo.id, mergedProduct.cartInfo.quantity - 1);
	};

	const isIncreaseDisabled = mergedProduct.quantity === mergedProduct.cartInfo?.quantity;
	const isDecreaseDisabled = mergedProduct.cartInfo?.quantity === 0;

	return {
		handleIncrease,
		handleDecrease,
		isIncreaseDisabled,
		isDecreaseDisabled,
		quantity: mergedProduct.cartInfo?.quantity ?? 0,
	};
};
