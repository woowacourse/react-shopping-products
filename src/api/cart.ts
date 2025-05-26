import { apiRequest } from '.';
import { CartItem } from '../types/common';
import { CartResponse } from '../types/response';
import { ApiError, ErrorCode } from '../types/error';

const BASE_URL = '/cart-items';
export const cartApi = {
  getCartItems: async (): Promise<CartItem[]> => {
    const response = await apiRequest<CartResponse>(
      `${BASE_URL}?page=0&size=50`
    );
    return response.content;
  },

  addToCart: async (productId: number): Promise<CartItem> => {
    try {
      return await apiRequest<CartItem>(`${BASE_URL}`, {
        method: 'POST',
        body: {
          productId,
          quantity: 1,
        },
      });
    } catch (error) {
      // 에러 코드에 따른 처리
      if (error instanceof Error) {
        // API 에러 응답인지 확인
        const errorData = tryParseApiError(error.message);
        if (errorData && errorData.errorCode === ErrorCode.OUT_OF_STOCK) {
          throw new Error(errorData.message);
        }
      }
      throw error;
    }
  },

  updateCartItem: async (
    cartItemId: number,
    quantity: number
  ): Promise<CartItem> => {
    try {
      return await apiRequest<CartItem>(`${BASE_URL}/${cartItemId}`, {
        method: 'PATCH',
        body: {
          quantity,
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        const errorData = tryParseApiError(error.message);
        if (errorData && errorData.errorCode === ErrorCode.OUT_OF_STOCK) {
          throw new Error(errorData.message);
        }
      }
      throw error;
    }
  },

  removeFromCart: async (cartItemId: number): Promise<void> => {
    return apiRequest(`${BASE_URL}/${cartItemId}`, {
      method: 'DELETE',
    });
  },
};

function tryParseApiError(errorMsg: string): ApiError | null {
  try {
    const jsonMatch = errorMsg.match(/\{.*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]) as ApiError;
    }
    return null;
  } catch (e) {
    console.error('Error parsing API error:', e);
    return null;
  }
}
