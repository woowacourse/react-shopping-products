import { act, renderHook, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import { APIProvider } from "../app/providers/APIContext";
import { CartItemContent } from "../entities/cartItem/response";
import { useCartItems } from "../entities/cartItem/useCartItems";
import { server } from "../__mocks__/server";
import { SHOP_API } from "../shared/api/config";

const mockHandleError = vi.fn();
const mockHandleSuccess = vi.fn();

vi.mock("../shared/hooks/useApiResponseToasts", () => ({
  default: () => ({
    handleError: mockHandleError,
    handleSuccess: mockHandleSuccess,
  }),
}));

const wrapper = ({ children }: React.PropsWithChildren) => (
  <MemoryRouter>
    <APIProvider>{children}</APIProvider>
  </MemoryRouter>
);

describe("useCartItems 훅", () => {
  it("초기 상태가 올바르게 설정된다", async () => {
    const { result } = renderHook(() => useCartItems(), { wrapper });

    expect(result.current.cartItems).toBeNull();
    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.cartItems).not.toBeNull();
    });

    expect(result.current.cartItemsCount).toBe(0);
    expect(result.current.totalPriceInCart).toBe(0);
  });

  describe("장바구니 상품 관리", () => {
    it("상품을 장바구니에 추가할 수 있다", async () => {
      let cartContent = [] as CartItemContent[];
      const newProductId = 1;

      server.use(
        http.get(`${SHOP_API.baseUrl}${SHOP_API.endpoint.cartItems}`, () => {
          return HttpResponse.json({
            content: cartContent,
          });
        }),

        http.post(
          `${SHOP_API.baseUrl}${SHOP_API.endpoint.cartItems}`,
          async ({ request }) => {
            const body = (await request.json()) as {
              productId: number;
              quantity: number;
            };

            cartContent = [
              {
                id: 101,
                product: {
                  id: body.productId,
                  name: "테스트용 상품",
                  price: 15000,
                  category: "테스트",
                  imageUrl: "test.jpg",
                  quantity: 10,
                },
                quantity: body.quantity || 1,
              },
            ];

            return HttpResponse.json({
              success: true,
              message: "상품이 장바구니에 추가되었습니다.",
            });
          }
        )
      );

      const { result } = renderHook(() => useCartItems(), { wrapper });

      await waitFor(() => expect(result.current.loading).toBe(false));

      expect(result.current.cartItems?.content.length).toBe(0);

      await act(async () => {
        await result.current.addProductInCart(newProductId);
      });

      expect(result.current.cartItems?.content.length).toBe(1);
      expect(result.current.cartItems?.content[0].product.id).toBe(
        newProductId
      );
      expect(result.current.cartItems?.content[0].quantity).toBe(1);
    });

    it("상품을 장바구니에서 삭제할 수 있다", async () => {
      let cartContent = [
        {
          id: 101,
          product: {
            id: 1,
            name: "테스트용 상품",
            price: 15000,
            category: "테스트",
            imageUrl: "test.jpg",
            quantity: 10,
          },
          quantity: 2,
        },
      ];

      server.use(
        http.get(`${SHOP_API.baseUrl}${SHOP_API.endpoint.cartItems}`, () => {
          return HttpResponse.json({
            content: cartContent,
          });
        }),

        http.delete(
          `${SHOP_API.baseUrl}${SHOP_API.endpoint.cartItems}/101`,
          () => {
            cartContent = [];
            return HttpResponse.json({
              success: true,
              message: "상품이 장바구니에서 삭제되었습니다.",
            });
          }
        )
      );

      const { result } = renderHook(() => useCartItems(), { wrapper });

      await waitFor(() => expect(result.current.loading).toBe(false));

      expect(result.current.cartItems?.content.length).toBe(1);
      const cartId = result.current.cartItems?.content[0]?.id ?? 0;
      expect(cartId).toBe(101);

      await act(async () => {
        await result.current.deleteProductInCart(cartId);
      });

      expect(result.current.cartItems?.content.length).toBe(0);
    });
  });

  describe("장바구니 상품 수량 관리", () => {
    it("상품 수량을 증가시킬 수 있다", async () => {
      let updatedQuantity = 2;

      server.use(
        http.get(`${SHOP_API.baseUrl}${SHOP_API.endpoint.cartItems}`, () => {
          return HttpResponse.json({
            content: [
              {
                id: 101,
                product: {
                  id: 1,
                  name: "테스트용 상품",
                  price: 15000,
                  category: "테스트",
                  imageUrl: "test.jpg",
                  quantity: 10,
                },
                quantity: updatedQuantity, // 2 -> 3
              },
            ],
          });
        }),

        http.patch(
          `${SHOP_API.baseUrl}${SHOP_API.endpoint.cartItems}/101`,
          async () => {
            updatedQuantity += 1;
            return HttpResponse.json({ success: true });
          }
        )
      );

      const { result } = renderHook(() => useCartItems(), { wrapper });
      await waitFor(() => expect(result.current.loading).toBe(false));

      expect(result.current.cartItems?.content[0].quantity).toBe(2);

      await act(async () => {
        await result.current.increaseItemQuantity(1);
      });

      expect(result.current.cartItems?.content[0].quantity).toBe(3);
    });

    it("상품 수량을 감소시킬 수 있다", async () => {
      let updatedQuantity = 2;

      server.use(
        http.get(`${SHOP_API.baseUrl}${SHOP_API.endpoint.cartItems}`, () => {
          return HttpResponse.json({
            content: [
              {
                id: 101,
                product: {
                  id: 1,
                  name: "테스트용 상품",
                  price: 15000,
                  category: "테스트",
                  imageUrl: "test.jpg",
                  quantity: 10,
                },
                quantity: updatedQuantity, // 2 -> 1
              },
            ],
          });
        }),
        http.patch(
          `${SHOP_API.baseUrl}${SHOP_API.endpoint.cartItems}/101`,
          async () => {
            updatedQuantity -= 1;
            return HttpResponse.json({ success: true });
          }
        )
      );

      const { result } = renderHook(() => useCartItems(), { wrapper });
      await waitFor(() => expect(result.current.loading).toBe(false));

      expect(result.current.cartItems?.content[0].quantity).toBe(2);

      await act(async () => {
        await result.current.decreaseItemQuantity(1);
      });

      expect(result.current.cartItems?.content[0].quantity).toBe(1);
    });

    it("수량이 1이면 감소시 상품이 삭제된다", async () => {
      let deleted = false;

      server.use(
        http.get(`${SHOP_API.baseUrl}${SHOP_API.endpoint.cartItems}`, () => {
          if (deleted) {
            return HttpResponse.json({
              content: [],
            });
          }

          return HttpResponse.json({
            content: [
              {
                id: 101,
                product: {
                  id: 1,
                  name: "테스트용 상품",
                  price: 15000,
                  category: "테스트",
                  imageUrl: "test.jpg",
                  quantity: 10,
                },
                quantity: 1, // 수량 1
              },
            ],
          });
        }),

        http.delete(
          `${SHOP_API.baseUrl}${SHOP_API.endpoint.cartItems}/101`,
          () => {
            deleted = true;
            return HttpResponse.json({
              success: true,
              message: "상품이 장바구니에서 삭제되었습니다.",
            });
          }
        )
      );

      const { result } = renderHook(() => useCartItems(), { wrapper });

      await waitFor(() => expect(result.current.loading).toBe(false));

      expect(
        result.current.cartItems?.content.some((item) => item.id === 101)
      ).toBe(true);
      expect(result.current.cartItems?.content[0].quantity).toBe(1);

      await act(async () => {
        await result.current.decreaseItemQuantity(1);
      });

      expect(
        result.current.cartItems?.content.some((item) => item.id === 101)
      ).toBe(false);
    });
  });

  describe("오류 처리", () => {
    it("API 오류 발생 시 handleError가 호출된다", async () => {
      const { result } = renderHook(() => useCartItems(), { wrapper });

      await waitFor(() => expect(result.current.loading).toBe(false));

      server.use(
        http.post(`${SHOP_API.baseUrl}${SHOP_API.endpoint.cartItems}`, () => {
          return HttpResponse.json(
            { success: false, message: "오류 발생" },
            { status: 400 }
          );
        })
      );

      const refetchSpy = vi.spyOn(result.current, "refetchCartItems");

      await act(async () => {
        await result.current.addProductInCart(999);
      });

      expect(mockHandleError).toHaveBeenCalled();
      expect(refetchSpy).not.toHaveBeenCalled(); // 오류 발생 시 refetch 호출되지 않음
    });
  });

  describe("데이터 다시 가져오기", () => {
    it("refetchCartItems 호출 시 데이터를 다시 가져온다", async () => {
      const { result } = renderHook(() => useCartItems(), { wrapper });

      await waitFor(() => expect(result.current.loading).toBe(false));

      let fetchCount = 0;
      server.use(
        http.get(`${SHOP_API.baseUrl}${SHOP_API.endpoint.cartItems}`, () => {
          fetchCount++;
          return HttpResponse.json({
            content: [
              {
                id: fetchCount * 100,
                product: {
                  id: fetchCount,
                  name: `상품 ${fetchCount}`,
                  price: 5000,
                  category: "패션잡화",
                  imageUrl: "image.jpg",
                  quantity: 10,
                },
                quantity: fetchCount,
              },
            ],
          });
        })
      );

      const initialId = result.current.cartItems?.content[0]?.id;

      await act(async () => result.current.refetchCartItems());

      await waitFor(() => {
        const newId = result.current.cartItems?.content[0]?.id;
        expect(newId).not.toBe(initialId);
      });
    });
  });

  describe("데이터 계산", () => {
    it("cartItemsCount가 올바르게 계산된다", async () => {
      server.use(
        http.get(`${SHOP_API.baseUrl}${SHOP_API.endpoint.cartItems}`, () => {
          return HttpResponse.json({
            content: [
              {
                id: 101,
                product: {
                  id: 1,
                  name: "상품1",
                  price: 10000,
                  imageUrl: "image1.jpg",
                  category: "식료품",
                  quantity: 3,
                },
                quantity: 2,
              },
              {
                id: 102,
                product: {
                  id: 2,
                  name: "상품2",
                  price: 20000,
                  category: "식료품",
                  imageUrl: "image2.jpg",
                  quantity: 5,
                },
                quantity: 1,
              },
              {
                id: 103,
                product: {
                  id: 3,
                  name: "상품3",
                  price: 5000,
                  category: "식료품",
                  imageUrl: "image3.jpg",
                  quantity: 8,
                },
                quantity: 3,
              },
            ],
          });
        })
      );
      const { result } = renderHook(() => useCartItems(), { wrapper });

      await waitFor(() => expect(result.current.loading).toBe(false));

      expect(result.current.cartItemsCount).toBe(3);
    });

    it("totalPriceInCart가 올바르게 계산된다", async () => {
      server.use(
        http.get(`${SHOP_API.baseUrl}${SHOP_API.endpoint.cartItems}`, () => {
          return HttpResponse.json({
            content: [
              {
                id: 101,
                product: {
                  id: 1,
                  name: "상품1",
                  price: 10000,
                  imageUrl: "image1.jpg",
                  category: "식료품",
                  quantity: 3,
                },
                quantity: 2,
              },
              {
                id: 102,
                product: {
                  id: 2,
                  name: "상품2",
                  price: 20000,
                  category: "식료품",
                  imageUrl: "image2.jpg",
                  quantity: 5,
                },
                quantity: 1,
              },
              {
                id: 103,
                product: {
                  id: 3,
                  name: "상품3",
                  price: 5000,
                  category: "식료품",
                  imageUrl: "image3.jpg",
                  quantity: 8,
                },
                quantity: 3,
              },
            ],
          });
        })
      );

      const { result } = renderHook(() => useCartItems(), { wrapper });

      await waitFor(() => expect(result.current.loading).toBe(false));

      expect(result.current.totalPriceInCart).toBe(55000);
    });

    it("quantityByProductId가 올바른 수량을 반환한다", async () => {
      server.use(
        http.get(`${SHOP_API.baseUrl}${SHOP_API.endpoint.cartItems}`, () => {
          return HttpResponse.json({
            content: [
              {
                id: 101,
                product: {
                  id: 1,
                  name: "상품1",
                  price: 10000,
                  category: "식료품",
                  imageUrl: "image1.jpg",
                  quantity: 10,
                },
                quantity: 2,
              },
              {
                id: 102,
                product: {
                  id: 2,
                  name: "상품2",
                  price: 20000,
                  category: "패션잡화",
                  imageUrl: "image2.jpg",
                  quantity: 5,
                },
                quantity: 3,
              },
            ],
          });
        })
      );

      const { result } = renderHook(() => useCartItems(), { wrapper });

      await waitFor(() => expect(result.current.loading).toBe(false));

      expect(result.current.quantityByProductId(1)).toBe(2);
      expect(result.current.quantityByProductId(2)).toBe(3);
      expect(result.current.quantityByProductId(3)).toBe(0); // 존재하지 않는 상품
    });
  });
});
