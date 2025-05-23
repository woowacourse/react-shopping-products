import { http, HttpResponse } from "msw";
import MOCKING_PRODUCT_DATA from "../data/products.json";

const getProducts = http.get(
  `http://techcourse-lv2-alb-974870821.ap-northeast-2.elb.amazonaws.com/products`,
  ({ request }) => {
    const url = new URL(request.url);
    const params = Object.fromEntries(url.searchParams.entries());
    const { category = "전체", sort } = params;

    const filteredAndSorted = MOCKING_PRODUCT_DATA.content
      .filter((product) => category === "전체" || product.category === category)
      .sort((a, b) => (sort === "price,desc" ? b.price - a.price : a.price - b.price));

    const responseData = {
      ...MOCKING_PRODUCT_DATA,
      content: filteredAndSorted,
    };

    return HttpResponse.json(responseData);
  },
);

export default [getProducts];
