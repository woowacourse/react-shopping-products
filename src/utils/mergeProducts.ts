import { CartProduct, Product } from "../types";

const mergeProducts = (products: Product[], cartProducts: CartProduct[]) => {
	return products.map((product) => {
		const cart = cartProducts.find((item) => item.product.id === product.id);
		return {
			product,
			...(cart && { id: cart.id }),
			...(cart && { quantity: cart.quantity }),
		};
	});
};

export default mergeProducts;
