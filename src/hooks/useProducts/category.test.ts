import { renderHook, waitFor, act } from '@testing-library/react';
import useProducts from '../useProducts';
import { Category } from '../../types/product';

describe('카테고리', () => {
  const CATEGORIES: Category[] = [
    'fashion',
    'beverage',
    'books',
    'electronics',
    'fitness',
    'kitchen',
  ];

  it('카테고리에 해당되는 상품만 불러온다.', async () => {
    const { result } = renderHook(() => useProducts());

    for (const selectedCategory of CATEGORIES) {
      await waitFor(() => {
        expect(
          result.current.products.every(({ category }) => category === selectedCategory),
        ).toBeFalsy();
      });

      await waitFor(() => {
        act(() => {
          result.current.handleCategoryChange(selectedCategory);
        });
      });

      await waitFor(() => {
        expect(
          result.current.products.length &&
            result.current.products.every(({ category }) => selectedCategory === category),
        ).toBeTruthy();
      });
    }
  });
});
