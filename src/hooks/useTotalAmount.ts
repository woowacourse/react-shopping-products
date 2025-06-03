import { useCart } from "./useCart";

export const useTotalAmount = () => {
	const { cartItems } = useCart();

	const totalAmount = cartItems.reduce((sum, cart) => {
		if (!cart) {
			return sum;
		}
		return sum + cart.product.price * cart.quantity;
	}, 0);

	return totalAmount;
};
