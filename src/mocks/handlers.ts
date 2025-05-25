import { http, HttpResponse } from "msw";
import mockProducts from "./mockProducts.json";
import { CartItem } from "../types/response.types";

const mockCart: { content: CartItem[] } = {
  content: [],
};

export const handlers = [
  http.get("/products", ({ request }) => {
    const url = new URL(request.url);
    const category = url.searchParams.get("category");
    const sort = url.searchParams.get("sort");

    let filtered = [...mockProducts.content];

    if (category && category !== "ALL") {
      filtered = filtered.filter((item) => item.category === category);
    }

    if (sort === "price_asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === "price_desc") {
      filtered.sort((a, b) => b.price - a.price);
    }

    return HttpResponse.json({
      ...mockProducts,
      content: filtered,
    });
  }),
  http.get("/products/{id}", () => {
    return HttpResponse.json(mockProducts);
  }),
  http.get("/cart-items", () => {
    return HttpResponse.json(mockCart);
  }),
  http.post("/cart-items", async ({ request }) => {
    const { productId, quantity } = (await request.json()) as {
      productId: number;
      quantity: number;
    };
    const product = mockProducts.content.find((p) => p.id === productId);
    if (product) {
      mockCart.content.push({
        id: mockCart.content.length + 1,
        quantity,
        product,
      });
    }

    return HttpResponse.json(null);
  }),
  http.delete("/cart-items/:id", ({ params }) => {
    mockCart.content = mockCart.content.filter(
      (item) => item.id !== Number(params.id)
    );
    return HttpResponse.json(null);
  }),
  http.patch("/cart-items/:id", async ({ request, params }) => {
    const cartItemId = Number(params.id);
    const { quantity } = (await request.json()) as { quantity: number };

    const item = mockCart.content.find((item) => item.id === cartItemId);
    if (item) {
      item.quantity = quantity;
      return HttpResponse.json(item);
    }

    return HttpResponse.json({ message: "Not found" }, { status: 404 });
  }),
];
