import { useMergedProducts } from "./useMergedProducts";

export const useCartInfo = () => {
	const mergedProducts = useMergedProducts();

	const cartItems = mergedProducts.filter((product) => product.cartInfo);

	return cartItems;
};
