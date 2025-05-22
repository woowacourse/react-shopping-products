import { CartProduct, Product } from "../types";

export interface MergedProduct extends Product {
	cartInfo: { id: number; quantity: number } | null;
}

const mergeProducts = (products: Product[], cartProducts: CartProduct[]): MergedProduct[] => {
	return products.map((product) => {
		const cart = cartProducts.find((item) => item.product.id === product.id);
		return {
			...product,
			cartInfo: cart ? { id: cart.id, quantity: cart.quantity } : null,
		};
	});
};

export default mergeProducts;
