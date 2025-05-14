import { useState, useEffect } from "react";
import { CartProduct } from "../types";
import { CART_URL } from "../constants/endpoint";

export default function useProducts() {
	const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);

	useEffect(() => {
		const fetchProducts = async () => {
			const response = await fetch(CART_URL);
			const data = await response.json();
			setCartProducts(data);
		};

		fetchProducts();
	}, []);

	return { cartProducts };
}
