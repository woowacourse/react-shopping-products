import { FetchProductsRequest, Product } from "../types/product.type";

async function fetchProducts({
  page,
  size,
}: FetchProductsRequest): Promise<Product[]> {
  const params = {
    page: page.toString(),
    size: size.toString(),
  };

  console.log("params", params);
  const requestBody = new URLSearchParams(params).toString();

  try {
    const response = await fetch(
      `http://techcourse-lv2-alb-974870821.ap-northeast-2.elb.amazonaws.com/produts?${requestBody}`
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
