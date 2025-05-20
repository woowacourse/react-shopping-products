import { CART_URL } from "../constants/endpoint";
import { CartProduct } from "../types";
import addCart from "../utils/api/addCart";
import fetchData from "../utils/api/fetchData";
import { useState, useEffect } from "react";
import removeCart from "../utils/api/removeCart";

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

	const updateCartItem = async (type: string, id: number) => {
		if (type === "add") {
			await addCart(id);
		}
		if (type === "remove") {
			await removeCart(id);
		}
		fetchCartProducts();
	};

	useEffect(() => {
		fetchCartProducts();
	}, []);

	return { cartProducts, cartError, updateCartItem };
}
