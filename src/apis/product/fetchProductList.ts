type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

const BASE_URL =
  "http://techcourse-lv2-alb-974870821.ap-northeast-2.elb.amazonaws.com/products";

const fetchProductList = async (
  method: HttpMethod,
  params = { page: "0", size: "20" }
) => {
  const url = new URL(BASE_URL);
  url.search = new URLSearchParams(params).toString();

  const options = {
    method,
    headers: {
      accept: "application/json",
    },
  };

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("에러 발생!");
  }

  const data = await response.json();

  return data;
};

export default fetchProductList;
