import { delay, http, HttpResponse } from "msw";
import { SHOP_API } from "../apis/config";
import { CategoryOptionsKey } from "../features/product/config/filter";
import { cartItemsData } from "./data/cartItems";
import { productsData } from "./data/products";

interface PostCartItemsRequestBody {
  productId: number;
  quantity: number;
}

interface PatchCartItemsRequestBody {
  id: number;
  quantity: number;
}

const currentCartItems = { ...cartItemsData };

export const handlers = [
  /**
   * Products API : GET
   */
  http.get(
    `${SHOP_API.baseUrl}${SHOP_API.endpoint.products}`,
    async ({ request }) => {
      const url = new URL(request.url);
      const category = url.searchParams.get("category") as CategoryOptionsKey;
      const sort = url.searchParams.get("sort");
      const page = url.searchParams.get("page") || "0";
      const size = url.searchParams.get("size") || "20";

      await delay(100);

      let filteredProducts = [...productsData.content];
      if (category && category !== "전체") {
        filteredProducts = filteredProducts.filter(
          (product) => product.category === category
        );
      }

      if (sort) {
        const [sortField, sortOrder] = sort.split(",");
        if (sortField === "price") {
          filteredProducts.sort((a, b) => {
            return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
          });
        }
      }

      const pageNum = parseInt(page);
      const sizeNum = parseInt(size);
      const startIndex = pageNum * sizeNum;
      const endIndex = startIndex + sizeNum;
      const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

      const response = {
        content: paginatedProducts,
        totalElements: filteredProducts.length,
        totalPages: Math.ceil(filteredProducts.length / sizeNum),
        size: sizeNum,
        number: pageNum,
        sort: { empty: !sort, sorted: !!sort, unsorted: !sort },
        pageable: {
          offset: startIndex,
          sort: { empty: !sort, sorted: !!sort, unsorted: !sort },
          paged: true,
          pageNumber: pageNum,
          pageSize: sizeNum,
          unpaged: false,
        },
        first: pageNum === 0,
        last: (pageNum + 1) * sizeNum >= filteredProducts.length,
        numberOfElements: paginatedProducts.length,
        empty: paginatedProducts.length === 0,
      };

      return HttpResponse.json(response);
    }
  ),

  /**
   * CartItems API : GET
   */
  http.get(
    `${SHOP_API.baseUrl}${SHOP_API.endpoint.cartItems}`,
    async ({ request }) => {
      const url = new URL(request.url);
      const page = url.searchParams.get("page") || "0";
      const size = url.searchParams.get("size") || "50";

      await delay(100);

      const pageNum = parseInt(page);
      const sizeNum = parseInt(size);
      const startIndex = pageNum * sizeNum;
      const endIndex = Math.min(
        startIndex + sizeNum,
        currentCartItems.content.length
      );
      const paginatedCartItems = currentCartItems.content.slice(
        startIndex,
        endIndex
      );

      const response = {
        ...currentCartItems,
        content: paginatedCartItems,
        size: sizeNum,
        number: pageNum,
        first: pageNum === 0,
        last: endIndex >= currentCartItems.content.length,
        numberOfElements: paginatedCartItems.length,
      };

      return HttpResponse.json(response);
    }
  ),

  /**
   * CartItems API : POST
   */
  http.post(
    `${SHOP_API.baseUrl}${SHOP_API.endpoint.cartItems}`,
    async ({ request }) => {
      const { productId, quantity = 1 } =
        (await request.json()) as PostCartItemsRequestBody;

      const product = productsData.content.find((p) => p.id === productId);

      if (!product) {
        return new HttpResponse(null, {
          status: 404,
          statusText: "Not found",
        });
      }

      const existingItemIndex = currentCartItems.content.findIndex(
        (item) => item.product.id === productId
      );

      let cartItem;

      if (existingItemIndex >= 0) {
        currentCartItems.content[existingItemIndex].quantity = quantity;
        cartItem = currentCartItems.content[existingItemIndex];
      } else {
        cartItem = {
          id: productId + 100,
          product,
          quantity,
        };
        currentCartItems.content.push(cartItem);

        currentCartItems.totalElements = currentCartItems.content.length;
        currentCartItems.numberOfElements = currentCartItems.content.length;
      }

      await delay(100);
      return HttpResponse.json(cartItem, { status: 201 });
    }
  ),

  /**
   * CartItems API : DELETE
   */
  http.delete(
    `${SHOP_API.baseUrl}${SHOP_API.endpoint.cartItems}/:cartId`,
    async ({ params }) => {
      const { cartId } = params;

      const initialLength = currentCartItems.content.length;
      currentCartItems.content = currentCartItems.content.filter(
        (item) => item.id !== Number(cartId)
      );

      if (currentCartItems.content.length === initialLength) {
        return new HttpResponse(null, {
          status: 404,
          statusText: "Not found",
        });
      }

      currentCartItems.totalElements = currentCartItems.content.length;
      currentCartItems.numberOfElements = currentCartItems.content.length;

      await delay(100);
      return new HttpResponse(null, { status: 204 });
    }
  ),

  /**
   * CartItems API : PATCH
   */
  http.patch(
    `${SHOP_API.baseUrl}${SHOP_API.endpoint.cartItems}/:cartId`,
    async ({ request }) => {
      const { id: cartId, quantity } =
        (await request.json()) as PatchCartItemsRequestBody;

      const itemIndex = currentCartItems.content.findIndex(
        (item) => item.id === Number(cartId)
      );

      if (itemIndex === -1) {
        return new HttpResponse(null, {
          status: 404,
          statusText: "Not found",
        });
      }

      currentCartItems.content[itemIndex].quantity = quantity;

      await delay(100);
      return HttpResponse.json(currentCartItems.content[itemIndex]);
    }
  ),
];
