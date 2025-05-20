import { CART_URL } from "../constants/endpoint";
import { USER_TOKEN } from "../constants/env";
import { useFetch } from "./useFetch";
import { CartProduct } from "../types";

export default function useCart() {
	const {
		data: cartProducts,
		error: cartError,
		refetch: fetchCartProducts,
	} = useFetch<CartProduct[]>({
		url: CART_URL,
		headers: {
			"content-type": "application/json",
			Authorization: `Basic ${USER_TOKEN}`,
		},
	});

	return { cartProducts, cartError, fetchCartProducts };
}
