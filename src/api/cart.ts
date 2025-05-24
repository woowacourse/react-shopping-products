import request from "../utils/request";

export async function fetchCartItems() {
  const data = await request({
    method: "GET",
    url: "/cart-items",
  });
  return data.content;
}

export async function changeCartQuantity({
  cartId,
  quantity,
}: {
  cartId: number;
  quantity: number;
}) {
  try {
    await request({
      method: "PATCH",
      url: `/cart-items/${cartId}`,
      body: {
        quantity,
      },
    });
  } catch {
    throw new Error("장바구니 추가 실패");
  }
}
