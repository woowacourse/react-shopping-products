import { CART_URL } from "../../constants/endpoint";
import { USER_TOKEN } from "../../constants/env";

const addCart = async (productId: number, quantity = 1) => {
	const response = await fetch(CART_URL, {
		headers: {
			"content-type": "application/json",
			Authorization: `Basic ${USER_TOKEN}`,
		},
		method: "POST",
		body: JSON.stringify({
			productId,
			quantity,
		}),
	});
	console.log(response.ok);
};

export default addCart;
