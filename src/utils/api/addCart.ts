import { CART_URL } from "../../constants/endpoint";
import { USER_TOKEN } from "../../constants/env";
import handleHttpError from "../handleHTTPError";

const addCart = async (productId: number, quantity = 1) => {
	try {
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

		handleHttpError(response);
	} catch (error) {
		if (error instanceof Error) throw new Error(error.message);
	}
};

export default addCart;
