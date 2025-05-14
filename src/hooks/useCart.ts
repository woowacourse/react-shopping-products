import { useState, useEffect } from "react";
import { CartProduct } from "../types";
import { CART_URL } from "../constants/endpoint";
import { USER_TOKEN } from "../constants/env";

export default function useCart() {
	const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);

	const fetchCartProducts = async () => {
		const response = await fetch(CART_URL, {
			headers: {
				"content-type": "application/json",
				Authorization: `Basic ${USER_TOKEN}`,
			},
			method: "GET",
		});
		const data = await response.json();

		setCartProducts(data.content);
	};

	useEffect(() => {
		fetchCartProducts();
	}, []);

	return { cartProducts, fetchCartProducts };
}
