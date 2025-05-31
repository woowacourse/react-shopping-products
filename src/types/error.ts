export interface ApiError {
  errorCode: string;
  message: string;
}

export enum ErrorCode {
  OUT_OF_STOCK = 'OUT_OF_STOCK',
  PRODUCT_NOT_FOUND = 'PRODUCT_NOT_FOUND',
  CART_ITEM_NOT_FOUND = 'CART_ITEM_NOT_FOUND',
}
