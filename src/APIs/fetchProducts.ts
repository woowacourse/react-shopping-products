import { FetchProductsRequest, Product } from "../types/product.type";

async function fetchProducts({
  endpoint,
}: FetchProductsRequest): Promise<Product[]> {
  try {
    const response = await fetch(
      `http://techcourse-lv2-alb-974870821.ap-northeast-2.elb.amazonaws.com${endpoint}`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.content;
  } catch (error) {
    throw new Error("Error fetching products:" + error);
  }
}

export default fetchProducts;
