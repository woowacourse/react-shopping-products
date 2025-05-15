import Header from '../../component/@common/Header';
import {
  ShoppingListFilterItemStyle,
  ShoppingListFilterStyle,
  ShoppingListStyle,
  ShoppingListTitleStyle
} from './ShoppingList.styles';
import Text from '../../component/@common/Text';
import Dropdown from '../../component/@common/Dropdown';
import { useEffect, useState } from 'react';
import ArrowIcon from '../../component/@common/ArrowIcon';
import ProductCard from '../../component/feature/ProductCard';
import ProductListLayout from '../../component/feature/ProductListLayout';

import { Product } from '../../types/response';

import useCart, { CartItem } from '../../hook/useCart';
import { useToast } from '../../component/@common/Toast/context';
import { cartApi } from '../../api/cart';
import { apiRequest } from '../../api';

type ProductListResponse = Product[];

export type SortOption = '높은 가격순' | '낮은 가격순';
export type CategoryOption = '전체' | '패션잡화' | '식료품';

const ShoppingList = () => {
  const [selected, setSelected] = useState<SortOption>('낮은 가격순');
  const [category, setCategory] = useState<CategoryOption>('전체');
  const [data, setData] = useState<Product[]>([]);
  const { cartData, fetchCartData } = useCart();
  const { openToast } = useToast();

  const categoryOptions: CategoryOption[] = ['전체', '패션잡화', '식료품'];

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiRequest<ProductListResponse>(
        `/products?page=0&size=20${
          category === '전체' ? '' : `&category=${category}`
        }${selected === '높은 가격순' ? '&sort=price,desc' : '&sort=price,asc'}`
      );

      setData(response);
    };

    fetchData();
  }, [category, selected]);

  const handleSortClick = (content: string) => {
    setSelected(content as SortOption);
  };

  const handleCategoryClick = (category: string) => {
    setCategory(category as CategoryOption);
  };

  const handleAddCart = async (productId: number) => {
    try {
      await cartApi.addToCart(productId);

      fetchCartData();
      openToast('상품이 장바구니에 추가되었습니다.', true);
    } catch (error) {
      openToast('장바구니 담기에 실패했어요...', false);
    }
  };

  const handleRemoveCart = async (cartId: number) => {
    try {
      const targetId = cartData.filter(
        (item: CartItem) => item.product.id === cartId
      )[0].id;

      await cartApi.removeFromCart(targetId);

      fetchCartData();
      openToast('상품이 장바구니에서 제거되었습니다.', true);
    } catch (error) {
      openToast('장바구니 빼기에 실패했어요...', false);
    }
  };

  const sortOptions: SortOption[] = ['높은 가격순', '낮은 가격순'];

  return (
    <>
      <Header count={cartData.length} />
      <section css={ShoppingListStyle}>
        <div css={ShoppingListTitleStyle}>
          <Text variant="title">bpple 상품 목록</Text>
          <div css={ShoppingListFilterStyle}>
            <div css={ShoppingListFilterItemStyle}>
              <Dropdown.Root>
                <Dropdown.Trigger>
                  {category}
                  <ArrowIcon />
                </Dropdown.Trigger>
                <Dropdown.List>
                  {categoryOptions.map((option) => (
                    <Dropdown.Item
                      key={option}
                      handleClick={handleCategoryClick}
                      content={option}
                    />
                  ))}
                </Dropdown.List>
              </Dropdown.Root>
            </div>
            <div css={ShoppingListFilterItemStyle}>
              <Dropdown.Root>
                <Dropdown.Trigger>
                  {selected}
                  <ArrowIcon />
                </Dropdown.Trigger>
                <Dropdown.List>
                  {sortOptions.map((option) => (
                    <Dropdown.Item
                      key={option}
                      handleClick={handleSortClick}
                      content={option}
                    />
                  ))}
                </Dropdown.List>
              </Dropdown.Root>
            </div>
          </div>
        </div>
      </section>
      <ProductListLayout>
        {data.map((product: Product) => {
          const isInCart = cartData.some(
            (item: CartItem) => item.product.id === product.id
          );
          return (
            <ProductCard
              key={product.id}
              {...product}
              isInCart={isInCart}
              handleAddCart={handleAddCart}
              handleRemoveCart={handleRemoveCart}
            />
          );
        })}
      </ProductListLayout>
    </>
  );
};

export default ShoppingList;
