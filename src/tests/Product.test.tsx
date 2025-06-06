import Product from '../ui/components/Product/Product';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ProductElement } from '../types/product';

describe('Product 컴포넌트', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockProduct: ProductElement = {
    product: {
      id: 1,
      name: '테스트 상품',
      price: 10000,
      imageUrl: 'https://example.com/image.jpg',
      category: '식료품',
      quantity: 10,
    },
    isInCart: false,
    cartId: null,
  };

  const mockOnAddCart = vi.fn().mockResolvedValue(undefined);
  const mockOnRemoveCart = vi.fn().mockResolvedValue(undefined);
  const mockOnUpdateQuantity = vi.fn().mockResolvedValue(undefined);

  it('상품 정보가 올바르게 표시되어야 한다', () => {
    render(
      <Product item={mockProduct} onAddCart={mockOnAddCart} onRemoveCart={mockOnRemoveCart} />,
    );

    expect(screen.getByText('테스트 상품')).toBeTruthy();
    expect(screen.getByText('10,000원')).toBeTruthy();
  });

  it('품절 상품일 때 SOLDOUT이 표시되어야 한다', () => {
    const soldOutProduct = {
      ...mockProduct,
      product: { ...mockProduct.product, quantity: 0 },
    };

    render(
      <Product item={soldOutProduct} onAddCart={mockOnAddCart} onRemoveCart={mockOnRemoveCart} />,
    );

    expect(screen.getByText('SOLDOUT')).toBeTruthy();
  });

  it('장바구니에 없는 상품은 담기 버튼이 표시되어야 한다', () => {
    render(
      <Product item={mockProduct} onAddCart={mockOnAddCart} onRemoveCart={mockOnRemoveCart} />,
    );

    const buttons = screen.getAllByRole('button');
    const addButton = buttons.find((button) => button.textContent === '담기');
    expect(addButton).toBeTruthy();
  });

  it('장바구니에 있는 상품은 수량 조절 버튼이 표시되어야 한다', () => {
    const inCartProduct = {
      ...mockProduct,
      isInCart: true,
      cartId: 1,
    };

    render(
      <Product
        item={inCartProduct}
        onAddCart={mockOnAddCart}
        onRemoveCart={mockOnRemoveCart}
        onUpdateQuantity={mockOnUpdateQuantity}
        cartQuantity={2}
      />,
    );

    expect(screen.getByText('2')).toBeTruthy();
    expect(screen.getByText('−')).toBeTruthy();
    expect(screen.getByText('+')).toBeTruthy();
  });

  it('담기 버튼 클릭 시 onAddCart가 호출되어야 한다', async () => {
    render(
      <Product item={mockProduct} onAddCart={mockOnAddCart} onRemoveCart={mockOnRemoveCart} />,
    );

    const buttons = screen.getAllByRole('button');
    const addButton = buttons.find((button) => button.textContent === '담기');
    if (addButton) {
      fireEvent.click(addButton);
    }

    await waitFor(() => {
      expect(mockOnAddCart).toHaveBeenCalledWith(mockProduct);
    });
  });
});
