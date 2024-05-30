import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { addCartItem, deleteCartItem, fetchCartItem, fetchProducts } from '../api';
import { CartItemType, ProductType } from '../types';
import { useToast } from './useToast';
import { formattedKey } from './useProducts.util';
import { AFTER_FETCH_SIZE, FIRST_FETCH_PAGE, FIRST_FETCH_SIZE } from '../constant/products';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

interface Props {
  selectBarCondition: Record<string, string>;
  handleCount: (cartItemCount: number) => void;
}

interface UseProductsResult {
  products: Product[];
  setPage: Dispatch<SetStateAction<number>>;
  hasMore: boolean;
  selectedItems: Set<number>;
  handleSelect: (itemId: number) => void;
}

export default function useProducts({ selectBarCondition, handleCount }: Props): UseProductsResult {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const { showToast } = useToast();

  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [idMap, setIdMap] = useState<Record<number, number>>({});
  // {productId : cartId}
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());

  useEffect(() => {
    const newSelectedItems: number[] = [];
    const cartItemIds = cartItems.map((cartItem) => {
      return cartItem.product.id;
    });
    products.forEach((product) => {
      if (cartItemIds.includes(product.id)) {
        newSelectedItems.push(product.id);
      }
    });

    setSelectedItems(new Set(newSelectedItems));
  }, [products, cartItems]);

  // idMap 만드는 것
  useEffect(() => {
    const newIdMap: Record<number, number> = {};

    cartItems.forEach((cartItem) => {
      newIdMap[cartItem.product.id] = cartItem.id;
    });
    setIdMap(newIdMap);
  }, [cartItems, selectedItems]);

  const handleSelect = async (itemId: number) => {
    const newSelectedItems = new Set(selectedItems);
    if (selectedItems.has(itemId)) {
      const result = await popCartItem(idMap[itemId]);
      if (result) newSelectedItems.delete(itemId);
    } else {
      const result = await pushCartItem(itemId);
      if (result) newSelectedItems.add(itemId);
    }
    setSelectedItems(newSelectedItems);
    getCartItems();
  };

  const getCartItems = async () => {
    const cartItems = await fetchCartItem();
    setCartItems(cartItems);
    handleCount(cartItems.length);
  };

  useEffect(() => {
    getCartItems();
  }, []);

  // 필터링 조건 바뀔 때, 초기화
  useEffect(() => {
    setProducts([]);
    setPage(0);
    setHasMore(true);
  }, [selectBarCondition.category, selectBarCondition.sort]);

  useEffect(() => {
    const setFetchedProducts = async () => {
      try {
        const size = page === FIRST_FETCH_PAGE ? FIRST_FETCH_SIZE : AFTER_FETCH_SIZE;
        const queryPage =
          page === FIRST_FETCH_PAGE
            ? FIRST_FETCH_PAGE
            : FIRST_FETCH_SIZE / AFTER_FETCH_SIZE - 1 + page;
        const newProducts = await fetchProducts({
          page: queryPage,
          size,
          category: selectBarCondition.category,
          sort: formattedKey(selectBarCondition.sort),
        });
        setProducts((prev) => [...prev, ...newProducts]);
        setHasMore(newProducts.length > 0);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
          showToast('상품 목록을 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.');
        }
      }
    };
    setFetchedProducts();
  }, [page, selectBarCondition]);

  const pushCartItem = async (itemId: number) => {
    try {
      await addCartItem(itemId);
      return true;
    } catch (error) {
      showToast('상품 담기에 실패했습니다.');
      return false;
    }
  };

  const popCartItem = async (itemId: number) => {
    try {
      await deleteCartItem(itemId);
      return true;
    } catch (error) {
      showToast('상품 빼기에 실패했습니다.');
      return false;
    }
  };

  return { products, setPage, hasMore, selectedItems, handleSelect };
}
