import { http } from "msw";

const mockData = Array.from({ length: 20 }, (_, idx) => ({
  id: idx + 1,
  name: `메이토${idx + 1}`,
  price: 1000,
  imageUrl: "",
  category: "식료품",
  quantity: 10,
}));

export const handlers = [
  http.get(`/products/:id`, (req, res, ctx) => {
    const { id } = req.params;
    const product = mockData.find((item) => item.id === Number(id));

    if (!product) {
      return res(ctx.status(404), ctx.json({ message: "Product not found" }));
    }

    return res(ctx.status(200), ctx.json(product));
  }),
];
