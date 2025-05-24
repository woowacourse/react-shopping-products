import { http, HttpResponse } from "msw";
import { CART_URL } from "../../constants/endpoint";
import cart from "../data/cart.json";

let cartState = [...cart];

export const getCartState = () => cartState;

export const cartHandler = [
	http.get(CART_URL, () => {
		return HttpResponse.json({ content: cartState });
	}),

	http.post(CART_URL, async ({ request }) => {
		const body = await request.json();
		const { productId, quantity } = body as { productId: number; quantity: number };

		if (!productId || quantity < 1) {
			return HttpResponse.error();
		}

		cartState.push({
			id: 20,
			quantity,
			product: {
				id: productId,
				name: "태블릿",
				price: 399,
				imageUrl: "https://via.placeholder.com/150/0000FF/808080?text=태블릿",
				category: "패션잡화",
			},
		});

		return HttpResponse.json({ status: 201 });
	}),

	http.delete(`${CART_URL}/:id`, async ({ params }) => {
		const id = Number(params.id);
		cartState = cartState.filter((item) => item.id !== id);
		return HttpResponse.json({ status: 200 });
	}),
];
