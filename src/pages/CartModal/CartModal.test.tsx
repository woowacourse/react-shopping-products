import '@testing-library/jest-dom';
import { vi } from 'vitest';
import type { Mock } from 'vitest';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import type React from 'react';
import { DataProvider } from '../../context/DataContext';
import {
  decreaseCartItems,
  getCartItems,
  increaseCartItems,
  removeCartItems,
} from '../../services/cartItemServices';
import { MOCK_CART_ITEMS, MockCartItemType } from '../../mocks/dummy';
import { CartModal } from './CartModal';

vi.mock('../../services/cartItemServices', () => ({
  getCartItems: vi.fn(),
  removeCartItems: vi.fn(),
  increaseCartItems: vi.fn(),
  decreaseCartItems: vi.fn(),
}));

const TestCartModal: React.FC = () => {
  return (
    <DataProvider>
      <CartModal open={true} setOpen={() => true} />
    </DataProvider>
  );
};

let mockCartItems: MockCartItemType[];
let mockShowModal: Mock;
let mockClose: Mock;

describe('장바구니 아이템 조회 테스트', () => {
  beforeEach(() => {
    (getCartItems as Mock).mockClear();
    mockCartItems = [...MOCK_CART_ITEMS];

    mockShowModal = vi.fn();
    mockClose = vi.fn();
    window.HTMLDialogElement.prototype.showModal = mockShowModal;
    window.HTMLDialogElement.prototype.close = mockClose;
  });

  it('장바구니 아이템의 세부 내용이 렌더링된다.', async () => {
    (getCartItems as Mock).mockResolvedValueOnce(mockCartItems);

    render(<TestCartModal />);

    await waitFor(() => {
      expect(screen.getByText('장바구니')).toBeInTheDocument();
    });

    const MUST_SHOW_INDEX = 0;
    const items = screen.getAllByTestId('modal-product-items');
    const item = items[MUST_SHOW_INDEX];
    const { product, quantity } = mockCartItems[MUST_SHOW_INDEX];

    expect(within(item).getByText(product.name)).toBeInTheDocument();
    expect(within(item).getByText(`${product.price.toLocaleString()}원`)).toBeInTheDocument();
    expect(within(item).getByText(String(quantity))).toBeInTheDocument();
    expect(within(item).getByAltText('아이템 수량 추가').closest('button'));
    expect(within(item).getByAltText('아이템 수량 감소').closest('button'));
  });
});

describe('장바구니 아이템 수량 변경 테스트', () => {
  it('+ 버튼을 클릭했을 때 수량이 증가한다.', async () => {
    (getCartItems as Mock).mockResolvedValueOnce(mockCartItems);

    render(<TestCartModal />);

    await waitFor(() => {
      expect(screen.getByText('장바구니')).toBeInTheDocument();
    });

    const MUST_SHOW_INDEX = 0;
    const targetId = mockCartItems[MUST_SHOW_INDEX].id;
    const initialQuantity = mockCartItems[MUST_SHOW_INDEX].quantity;

    const increaseButtons = await screen.findAllByRole('button', {
      name: '아이템 수량 추가',
    });
    const increaseButton = increaseButtons[MUST_SHOW_INDEX];
    fireEvent.click(increaseButton);

    await waitFor(() => {
      expect(increaseCartItems).toHaveBeenCalledWith(targetId, initialQuantity + 1);
    });
  });

  it('- 버튼을 클릭했을 때 수량이 감소한다.', async () => {
    (getCartItems as Mock).mockResolvedValueOnce(mockCartItems);

    render(<TestCartModal />);

    await waitFor(() => {
      expect(screen.getByText('장바구니')).toBeInTheDocument();
    });

    const MUST_SHOW_INDEX = 0;
    const targetId = mockCartItems[MUST_SHOW_INDEX].id;
    const initialQuantity = mockCartItems[MUST_SHOW_INDEX].quantity;

    const decreaseButtons = await screen.findAllByRole('button', {
      name: '아이템 수량 감소',
    });
    const decreaseButton = decreaseButtons[MUST_SHOW_INDEX];
    fireEvent.click(decreaseButton);

    await waitFor(() => {
      expect(decreaseCartItems).toHaveBeenCalledWith(targetId, initialQuantity - 1);
    });
  });
});

describe('장바구니 아이템 삭제 테스트', () => {
  it('삭제 버튼이 정상적으로 작동한다', async () => {
    (getCartItems as Mock)
      .mockResolvedValueOnce(mockCartItems)
      .mockResolvedValueOnce(mockCartItems.slice(1));

    render(<TestCartModal />);

    await waitFor(() => {
      expect(screen.getByText('장바구니')).toBeInTheDocument();
    });

    const MUST_SHOW_INDEX = 0;
    const targetId = mockCartItems[MUST_SHOW_INDEX].id;

    const deleteButtons = await screen.findAllByRole('button', {
      name: '삭제',
    });
    const deleteButton = deleteButtons[MUST_SHOW_INDEX];
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(removeCartItems).toHaveBeenCalledWith(targetId);
      expect(
        screen.queryByText(mockCartItems[MUST_SHOW_INDEX].product.name),
      ).not.toBeInTheDocument();
    });
  });
});
