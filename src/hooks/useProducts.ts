import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { addCartItem, fetchCartItem, fetchProducts } from '../api';
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
}

interface UseProductsResult {
  products: Product[];
  setPage: Dispatch<SetStateAction<number>>;
  hasMore: boolean;
  selectedItems: Set<number>;
  handleSelect: (itemId: number) => void;
}

export default function useProducts({ selectBarCondition }: Props): UseProductsResult {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const { showToast } = useToast();

  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
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

  const handleSelect = async (itemId: number) => {
    const newSelectedItems = new Set(selectedItems);
    if (selectedItems.has(itemId)) {
      newSelectedItems.delete(itemId);
    } else {
      newSelectedItems.add(itemId);
      postCartItem(itemId);
    }
    setSelectedItems(newSelectedItems);
  };

  useEffect(() => {
    const getCartItems = async () => {
      const cartItems = await fetchCartItem();

      setCartItems(cartItems);
    };

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

  const postCartItem = async (itemId: number) => {
    try {
      await addCartItem(itemId);
    } catch (error) {
      showToast('상품 추가에 실패했습니다.');
    }
  };

  return { products, setPage, hasMore, selectedItems, handleSelect };
}
