// validationTool.test.ts
import { validateByKey } from "@/util/validationTool";
import { ApiError } from "@/constants/Error";

/*
 * 유효·무효 페이로드 샘플
 * (타입 에러가 아니라 런타임 검증만 확인하기 위해 any 사용)
 */
const validProduct = {
  id: 1,
  name: "초코바",
  price: 1200,
  imageUrl: "https://example.com/img.png",
  category: "snack",
  quantity: 3, // ProductWithQuantity
};

const validCartItem = {
  id: 10,
  quantity: 2,
  product: validProduct,
};

describe("validateByKey는", () => {
  it("products 응답이 올바르면 그대로 반환", () => {
    const payload = { content: [validProduct] };
    expect(validateByKey("products", payload)).toBe(payload);
  });

  it("cart-items 응답이 올바르면 그대로 반환", () => {
    const payload = { content: [validCartItem] };
    expect(validateByKey("cart-items", payload)).toBe(payload);
  });

  it("products 응답이 잘못되면 ApiError(422)를 던진다", () => {
    const badPayload = { content: [{ ...validProduct, name: undefined }] };
    expect(() => validateByKey("products", badPayload)).toThrow(ApiError);
    try {
      validateByKey("products", badPayload);
    } catch (e) {
      const err = e as ApiError;
      expect(err.status).toBe(422);
      expect(err.message).toMatch("products 응답 형식");
    }
  });

  it("cart-items 응답이 잘못되면 ApiError(422)를 던진다", () => {
    // product 필드 구조 깨뜨림 → invalid
    const badPayload = { content: [{ id: 1, quantity: 2, product: {} }] };
    expect(() => validateByKey("cart-items", badPayload)).toThrow(ApiError);
  });
});
