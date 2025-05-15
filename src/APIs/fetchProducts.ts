import {
  FetchProductsRequest,
  FetchProductsResponse,
} from "../types/product.type";

async function fetchProducts({
  endpoint,
}: FetchProductsRequest): Promise<FetchProductsResponse> {
  try {
    const response = await fetch(
      `http://techcourse-lv2-alb-974870821.ap-northeast-2.elb.amazonaws.com${endpoint}`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return { content: data.content, totalPages: data.totalPages };
  } catch (error) {
    throw new Error("Error fetching products:" + error);
  }
}

export default fetchProducts;
