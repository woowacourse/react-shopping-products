import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ProductListPage } from '@/features/ProductList';
import { DataProvider } from '@/shared/context/DataProvider';
import { productsData } from '@/shared/mocks/handlers/product/products.data';

export const renderProductListPage = () =>
  render(
    <DataProvider>
      <ProductListPage />
    </DataProvider>
  );

describe('ProductList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

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
