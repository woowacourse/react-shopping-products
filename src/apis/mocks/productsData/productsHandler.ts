import { http, HttpResponse } from "msw";
import { productsMockData } from "./productsMockData";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const PRODUCTS_URL = `${BASE_URL}/products`;

export const productsHandlers = [
  http.get(PRODUCTS_URL, ({ request }) => {
    const url = new URL(request.url);
    const categoryOption = url.searchParams.get("category");
    const filteredProducts =
      categoryOption === null
        ? productsMockData.content
        : productsMockData.content.filter(
            ({ category }) => category === categoryOption
          );

    const sortOption = url.searchParams.get("sort");
    const [, order] = sortOption?.split(",") ?? [];
    const sortedProducts = filteredProducts.sort((a, b) =>
      order === "asc" ? a.price - b.price : b.price - a.price
    );

    return HttpResponse.json(
      { ...productsMockData, content: sortedProducts },
      { status: 200 }
    );
  }),
];
