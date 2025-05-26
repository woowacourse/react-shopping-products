import { http, HttpResponse } from "msw";
import { CART_URL } from "../../constants/endpoint";
import cart from "../data/cart.json";
import products from "../data/products.json";

let cartState = [...cart];

export const getCartState = () => cartState;

export const cartHandler = [
	http.get(CART_URL, () => {
		return HttpResponse.json({ content: cartState });
	}),

	http.post(CART_URL, async ({ request }) => {
		const body = await request.json();
		const { productId, quantity } = body as { productId: number; quantity: number };
		const product = products.find((item) => item.id === productId);

		if (!product) {
			return HttpResponse.json({ message: "상품을 찾을 수 없습니다." }, { status: 404 });
		}

		cartState.push({
			id: cartState.length === 0 ? 1 : cartState[cartState.length - 1].id + 1,
			quantity,
			product,
		});

		return HttpResponse.json({ status: 201 });
	}),

	http.patch(`${CART_URL}/:id`, async ({ params, request }) => {
		const id = Number(params.id);
		const { quantity } = (await request.json()) as { quantity: number };

		const targetItem = cartState.find((item) => item.id === id);

		if (!targetItem) {
			return HttpResponse.json({ message: "상품을 찾을 수 없습니다." }, { status: 404 });
		}

		if (targetItem.product.quantity === 0) {
			return HttpResponse.json({ message: "해당 상품은 품절되었습니다." }, { status: 409 });
		}

		if (quantity > targetItem.product.quantity) {
			return HttpResponse.json(
				{
					message: `재고보다 많은 수량은 담을 수 없습니다. (남은 수량: ${targetItem.product.quantity})`,
				},
				{ status: 400 }
			);
		}

		cartState = cartState.map((item) => (item.id === id ? { ...item, quantity } : item));

		return HttpResponse.json({ content: cartState }, { status: 200 });
	}),

	http.delete(`${CART_URL}/:id`, async ({ params }) => {
		const id = Number(params.id);
		cartState = cartState.filter((item) => item.id !== id);
		return HttpResponse.json({ status: 200 });
	}),
];
