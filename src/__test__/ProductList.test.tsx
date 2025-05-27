import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';

import { ProductListPage } from '@/features/ProductList';
import { DataProvider } from '@/shared/context/ShoppingDataProvider';
import { productsData } from '@/shared/mocks/handlers/product/products.data';

export const renderProductListPage = () =>
  render(
    <DataProvider>
      <ProductListPage />
    </DataProvider>
  );

describe('ProductList 테스트', () => {
  it('상품 리스트를 조회할 수 있다..', async () => {
    // Given : 상품 목록을 받았을 때
    // When : 유저가 화면에 들어왔을 때
    renderProductListPage();

    const productButton = await screen.findAllByRole('button', {
      name: /담기$/,
    });
    // Then : 상품 목록이 화면에 보여진다.
    expect(productButton.length).toBe(productsData.content.length);
  });
});
