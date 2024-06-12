import { describe, it, expect } from "vitest";
import { calculatePaymentPrice } from "@/utils";
import { CartItem } from "@/types";

describe("util 함수 테스트", () => {
  it("장바구니 결제 금액 계산", () => {
    const cartItems = [
      {
        id: 15791,
        quantity: 1,
        product: {
          id: 112,
          name: "추리소설",
          price: 8000,
          imageUrl:
            "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=3474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          category: "books",
        },
      },
      {
        id: 16869,
        quantity: 8,
        product: {
          id: 207,
          name: "string",
          price: 10000,
          imageUrl: "string",
          category: "string",
        },
      },
    ];
    expect(calculatePaymentPrice(cartItems as CartItem[])).toBe(88000);
  });
});
