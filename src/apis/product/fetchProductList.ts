const BASE_URL =
  "http://techcourse-lv2-alb-974870821.ap-northeast-2.elb.amazonaws.com/products";

const fetchProductList = async () => {
  const response = await fetch(`${BASE_URL}`);
  if (!response.ok) {
    throw new Error("에러 발생!");
  }

  const data = await response.json();

  return data;
};

export default fetchProductList;
