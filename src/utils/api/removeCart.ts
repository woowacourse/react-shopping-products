import { CART_URL } from "../../constants/endpoint";
import { USER_TOKEN } from "../../constants/env";

const removeCart = async (cartId: number) => {
	const response = await fetch(`${CART_URL}/${cartId}`, {
		headers: {
			"content-type": "application/json",
			Authorization: `Basic ${USER_TOKEN}`,
		},
		method: "DELETE",
	});
	console.log(response);
};

export default removeCart;
