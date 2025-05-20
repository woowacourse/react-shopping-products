type fetchAddProductParams = {
  params: {
    productId: string;
    quantity: string;
  };
};

const BASE_URL = `${import.meta.env.VITE_BASE_URL}/cart-items`;
const TOKEN = import.meta.env.VITE_TOKEN;

const fetchAddProduct = async ({ params }: fetchAddProductParams) => {
  const url = new URL(BASE_URL);

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${TOKEN}`,
    },
    body: JSON.stringify(params),
  };

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("상품이 이미 존재합니다.");
  }
};

export default fetchAddProduct;
