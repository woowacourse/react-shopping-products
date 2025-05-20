import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from './ProductCard';

vi.mock('../../@common/Toast/context', () => ({
  useToast: () => ({
    openToast: vi.fn(),
    isVisible: false,
    closeToast: vi.fn(),
  }),
}));

describe('ProductCard 컴포넌트', () => {
  const mockProduct = {
    id: 1,
    name: '테스트 상품',
    price: 10000,
    imageUrl: 'test.jpg',
  };

  it('담기 버튼 클릭 시 handleAddCart 함수가 호출된다', () => {
    const mockHandleAddCart = vi.fn();
    const mockHandleRemoveCart = vi.fn();

    render(
      <ProductCard
        {...mockProduct}
        isInCart={false}
        handleAddCart={mockHandleAddCart}
        handleRemoveCart={mockHandleRemoveCart}
      />
    );

    expect(screen.getByText('테스트 상품')).toBeTruthy();
    expect(screen.getByText('10,000원')).toBeTruthy();

    const addButton = screen.getByText('담기');
    expect(addButton).toBeTruthy();

    fireEvent.click(addButton);
    expect(mockHandleAddCart).toHaveBeenCalledWith(1);
  });

  it('빼기 버튼 클릭 시 handleRemoveCart 함수가 호출된다', () => {
    const mockHandleAddCart = vi.fn();
    const mockHandleRemoveCart = vi.fn();

    render(
      <ProductCard
        {...mockProduct}
        isInCart={true}
        handleAddCart={mockHandleAddCart}
        handleRemoveCart={mockHandleRemoveCart}
      />
    );

    const removeButton = screen.getByText('빼기');
    expect(removeButton).toBeTruthy();

    fireEvent.click(removeButton);

    expect(mockHandleRemoveCart).toHaveBeenCalledWith(1);
  });

  it('isInCart 상태에 따라 적절한 버튼이 렌더링된다', () => {
    const mockHandleAddCart = vi.fn();
    const mockHandleRemoveCart = vi.fn();

    const { rerender } = render(
      <ProductCard
        {...mockProduct}
        isInCart={false}
        handleAddCart={mockHandleAddCart}
        handleRemoveCart={mockHandleRemoveCart}
      />
    );

    expect(screen.getByText('담기')).toBeTruthy();
    expect(screen.queryByText('빼기')).toBeNull();

    rerender(
      <ProductCard
        {...mockProduct}
        isInCart={true}
        handleAddCart={mockHandleAddCart}
        handleRemoveCart={mockHandleRemoveCart}
      />
    );

    expect(screen.getByText('빼기')).toBeTruthy();
    expect(screen.queryByText('담기')).toBeNull();
  });
});
