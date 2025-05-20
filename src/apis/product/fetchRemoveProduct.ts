type fetchRemoveProductParams = {
  params: {
    productId: number;
  };
};

const BASE_URL = `${import.meta.env.VITE_BASE_URL}/cart-items`;
const TOKEN = import.meta.env.VITE_TOKEN;

const fetchRemoveProduct = async ({ params }: fetchRemoveProductParams) => {
  const url = new URL(`${BASE_URL}/${params.productId}`);

  const options = {
    method: "DELETE",
    headers: {
      accept: "application/json",
      Authorization: `Basic ${TOKEN}`,
    },
  };

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("상품을 빼는데 실패했습니다.");
  }
};

export default fetchRemoveProduct;
