async function AddProductItemApi(productId: number, quantity: number) {
  const API_URL = import.meta.env.VITE_BASE_URL || "";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${import.meta.env.VITE_USER_TOKEN}`,
    },
    body: JSON.stringify({
      productId,
      quantity,
    }),
  };
  const response = await fetch(`${API_URL}/cart-items`, options);

  console.log("상품추가 데이터", response);
}

export default AddProductItemApi;
