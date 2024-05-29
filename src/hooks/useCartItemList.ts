import { useEffect, useState } from "react";

import {
  requestAddCartItem,
  requestDeleteCartItem,
  requestFetchCartItemList,
} from "../apis/carItems";
import { CartItem } from "../interfaces/CartItem";
import { Product } from "../interfaces/Product";

interface UseCartItemListResult {
  cartItemList: CartItem[];
  cartItemListLoading: boolean;
  cartItemListError: unknown;
  quantity: number;
  isInCart: (productId: number) => boolean;
  addCartItem: (product: Product) => Promise<void>;
  deleteCartItem: (product: Product) => Promise<void>;
  toggleCartItem: (product: Product) => Promise<void>;
}

export default function useCartItemList(): UseCartItemListResult {
  const [cartItemList, setCartItemList] = useState<CartItem[]>([]);
  const [cartItemListLoading, setCartItemListLoading] = useState<boolean>(true);
  const [cartItemListError, setCartItemListError] = useState<unknown>(null);
  const [quantity, setQuantity] = useState<number>(cartItemList.length);

  const isInCart = (productId: number) =>
    cartItemList.some(({ product }: CartItem) => product.id === productId);

  const addCartItem = async (product: Product) => {
    // setCartItemList((prev) => [
    //   ...prev,
    //   {
    //     id:
    //       cartItemList.length === 0
    //         ? 1
    //         : cartItemList[cartItemList.length - 1].id + 1,
    //     product: product,
    //     quantity: 1,
    //   },
    // ]);
    // 여기 로직 때문에 한번 데이터를 넣었다 빼면 그 후 서버에서 부여하는 장바구니 id랑
    // 우리가 부여한 장바구니 id랑 달라서 오류가 나더라 ㅠㅠ
    // 일단은 두 로직 다 장바구니 리스트를 다시 fetch해서 넣어주는 방식으로 바꿨더니 오류는 안 나
    try {
      await requestAddCartItem(product.id, 1);
    } catch (error) {
      setCartItemListError(error);
    } finally {
      const data = await requestFetchCartItemList();
      setCartItemList(data.content);
    }
  };

  const deleteCartItem = async (product: Product) => {
    const target = cartItemList.find((item) => {
      {
        return item.product.id === product.id;
      }
    });
    // const newCartItemList = cartItemList.filter(
    //   (item: CartItem) => item.product.id !== product.id
    // );
    // setCartItemList(newCartItemList);
    // TODO: 여기는 괜찮은데 일단은 바꿔놨어
    try {
      await requestDeleteCartItem(target!.id);
    } catch (error) {
      setCartItemListError(error);
    } finally {
      const data = await requestFetchCartItemList();
      setCartItemList(data.content);
    }
  };

  const toggleCartItem = async (product: Product) => {
    setCartItemListLoading(true);
    isInCart(product.id)
      ? await deleteCartItem(product)
      : await addCartItem(product);
    setCartItemListLoading(false);
  };

  useEffect(() => {
    const getCartItemList = async () => {
      try {
        setCartItemListLoading(true);
        const data = await requestFetchCartItemList();
        setCartItemList(data.content);
      } catch (error) {
        setCartItemListError(error);
      } finally {
        setCartItemListLoading(false);
      }
    };
    getCartItemList();
  }, []);

  useEffect(() => {
    setQuantity(cartItemList.length);
  }, [cartItemList]);
  // 지금은 훅 분리 안해서 setQuantity를 해도 변경이 적용 안되더라
  // 내일 가서 한번 관심사별로 훅 분리해볼게
  return {
    cartItemList,
    cartItemListLoading,
    cartItemListError,
    quantity,
    isInCart,
    addCartItem,
    deleteCartItem,
    toggleCartItem,
  };
}
