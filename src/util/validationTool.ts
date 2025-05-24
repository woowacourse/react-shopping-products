import { Product, ProductWithQuantity } from "@/types/product";
import { CartItem } from "@/types/cartContents";
import { DataKey, DataResponseMap } from "../types/data-types";
import { ApiError, ErrorType } from "@/constants/Error";

type UnknownRec = Record<string, unknown>;
const isObj = (v: unknown): v is UnknownRec =>
  typeof v === "object" && v !== null;

const isProduct = (u: unknown): u is Product => {
  if (!isObj(u)) return false;
  const o = u;
  return (
    typeof o.id === "number" &&
    typeof o.name === "string" &&
    typeof o.price === "number" &&
    typeof o.imageUrl === "string" &&
    typeof o.category === "string"
  );
};
const isProductWithQuantity = (u: unknown): u is ProductWithQuantity =>
  isProduct(u) && typeof (u as ProductWithQuantity).quantity === "number";

const isCartItem = (u: unknown): u is CartItem => {
  if (!isObj(u)) return false;
  return (
    typeof u.id === "number" &&
    typeof u.quantity === "number" &&
    isProductWithQuantity(u.product)
  );
};

const isProductsRes = (u: unknown): u is DataResponseMap["products"] =>
  isObj(u) && Array.isArray(u.content) && u.content.every(isProduct);

const isCartItemsRes = (u: unknown): u is DataResponseMap["cart-items"] =>
  isObj(u) && Array.isArray(u.content) && u.content.every(isCartItem);

const guards = {
  products: isProductsRes,
  "cart-items": isCartItemsRes,
} satisfies {
  [K in DataKey]: (d: unknown) => d is DataResponseMap[K];
};

export function validateByKey<K extends DataKey>(
  key: K,
  data: unknown
): DataResponseMap[K] {
  if (!guards[key](data)) {
    throw new ApiError(
      422,
      "Unprocessable Entity",
      `${key} 응답 형식이 올바르지 않습니다.`,
      ErrorType.VALIDATION
    );
  }
  return data as DataResponseMap[K];
}
