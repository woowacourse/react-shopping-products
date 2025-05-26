import { CART_URL } from "../constants/endpoint";
import { CartProduct } from "../types";
import addCart from "../utils/api/addCart";
import fetchData from "../utils/api/fetchData";
import { useState, useEffect } from "react";
import removeCart from "../utils/api/removeCart";
import updateCartItemCount from "../utils/api/updateCart";

export default function useCart() {
	const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
	const [cartError, setCartError] = useState<string>("");

	const fetchCartProducts = async () => {
		try {
			const data = await fetchData({ url: CART_URL });
			setCartProducts(data);
		} catch (error) {
			if (error instanceof Error) {
				setCartError(error.message);
			}
		}
	};

	const updateCartItem = async (type: string, id: number, quantity: number | undefined) => {
		if (type === "add") {
			try {
				await addCart(id);
			} catch (error) {
				if (error instanceof Error) setCartError(error.message);
			}
		}
		if (type === "remove") {
			try {
				await removeCart(id);
			} catch (error) {
				if (error instanceof Error) setCartError(error.message);
			}
		}

		if (type === "change") {
			try {
				await updateCartItemCount(id, quantity);
			} catch (error) {
				if (error instanceof Error) setCartError(error.message);
			}
		}

		fetchCartProducts();
	};

	useEffect(() => {
		fetchCartProducts();
	}, []);

	return { cartProducts, cartError, updateCartItem };
}
