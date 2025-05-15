import { useState, useEffect } from "react";
import { CartProduct } from "../types";
import { CART_URL } from "../constants/endpoint";
import handleHttpError from "../utils/handleHTTPError";
import { USER_TOKEN } from "../constants/env";

export default function useCart() {
	const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
	const [error, setError] = useState<string>("");

	const fetchCartProducts = async () => {
		try {
			const response = await fetch(CART_URL, {
				headers: {
					"content-type": "application/json",
					Authorization: `Basic ${USER_TOKEN}`,
				},
				method: "GET",
			});
			handleHttpError(response);
			const data = await response.json();
			setCartProducts(data.content);
		} catch (error) {
			if (error instanceof Error) {
				setError(error.message);
			}
		}
	};

	useEffect(() => {
		fetchCartProducts();
	}, []);

	return { cartProducts, fetchCartProducts, cartError: error };
}
