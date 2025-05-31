import { useCartInfo } from "./useCartInfo";

export const useTotalAmount = () => {
	const cartItems = useCartInfo();

	const totalAmount = cartItems.reduce((sum, product) => {
		if (!product.cartInfo) {
			return sum;
		}
		return sum + product.price * product.cartInfo.quantity;
	}, 0);

	return totalAmount;
};
