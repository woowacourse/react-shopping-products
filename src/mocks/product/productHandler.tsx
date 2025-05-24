import { http, HttpResponse } from "msw";
import { PRODUCT_MOCK_DATA } from "./ProductMockData";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const productHandler = [
  http.get(`${baseUrl}/products`, async ({ request }) => {
    const url = new URL(request.url);
    const categoryOption = url.searchParams.get("category");
    const priceOption = url.searchParams.get("sort")?.split(",")[1];

    const filteredCategoryProducts =
      categoryOption === null
        ? PRODUCT_MOCK_DATA.content
        : PRODUCT_MOCK_DATA.content.filter(
            ({ category }) => category === categoryOption
          );
    const filteredPriceProducts = filteredCategoryProducts.sort((a, b) =>
      priceOption === "desc" ? b.price - a.price : a.price - b.price
    );

    return HttpResponse.json({
      ...PRODUCT_MOCK_DATA,
      content: filteredPriceProducts,
    });
  }),
];
