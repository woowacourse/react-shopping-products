import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Product from './Product';
import { ProductElement } from '../../../types/product';

describe('Product 컴포넌트', () => {
  const mockProduct: ProductElement = {
    product: {
      id: 1,
      name: '테스트 상품',
      price: 10000,
      imageUrl: 'https://example.com/image.jpg',
      category: '식료품',
      quantity: 10
    },
    isInCart: false,
    cartId: null
  };

  const mockOnAddCart = vi.fn();
  const mockOnRemoveCart = vi.fn();
  const mockOnUpdateQuantity = vi.fn();

  it('상품 정보가 올바르게 표시되어야 한다', () => {
    render(
      <Product 
        item={mockProduct}
        onAddCart={mockOnAddCart}
        onRemoveCart={mockOnRemoveCart}
      />
    );

    expect(screen.getByText('테스트 상품')).toBeInTheDocument();
    expect(screen.getByText('10,000원')).toBeInTheDocument();
  });

  it('품절 상품일 때 SOLDOUT이 표시되어야 한다', () => {
    const soldOutProduct = {
      ...mockProduct,
      product: { ...mockProduct.product, quantity: 0 }
    };

    render(
      <Product 
        item={soldOutProduct}
        onAddCart={mockOnAddCart}
        onRemoveCart={mockOnRemoveCart}
      />
    );

    expect(screen.getByText('SOLDOUT')).toBeInTheDocument();
  });

  it('장바구니에 없는 상품은 담기 버튼이 표시되어야 한다', () => {
    render(
      <Product 
        item={mockProduct}
        onAddCart={mockOnAddCart}
        onRemoveCart={mockOnRemoveCart}
      />
    );

    const addButton = screen.getByRole('button');
    expect(addButton).toHaveTextContent('담기');
  });

  it('장바구니에 있는 상품은 수량 조절 버튼이 표시되어야 한다', () => {
    const inCartProduct = {
      ...mockProduct,
      isInCart: true,
      cartId: 1
    };

    render(
      <Product 
        item={inCartProduct}
        onAddCart={mockOnAddCart}
        onRemoveCart={mockOnRemoveCart}
        onUpdateQuantity={mockOnUpdateQuantity}
        cartQuantity={2}
      />
    );

    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('−')).toBeInTheDocument();
    expect(screen.getByText('+')).toBeInTheDocument();
  });

  it('담기 버튼 클릭 시 onAddCart가 호출되어야 한다', async () => {
    render(
      <Product 
        item={mockProduct}
        onAddCart={mockOnAddCart}
        onRemoveCart={mockOnRemoveCart}
      />
    );

    const addButton = screen.getByRole('button');
    fireEvent.click(addButton);

    expect(mockOnAddCart).toHaveBeenCalledWith(mockProduct);
  });
});