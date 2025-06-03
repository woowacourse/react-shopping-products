import '@testing-library/jest-dom';
import { vi } from 'vitest';
import type { Mock } from 'vitest';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import type React from 'react';
import { DataProvider } from '../../context/DataContext';
import { MOCK_CART_ITEMS } from '../../mocks/dummy';
import { CartModal } from './CartModal';
import { CartItemType } from '../../types/data';
import { server } from '../../mocks/server';

const TestCartModal: React.FC = () => {
  return (
    <DataProvider>
      <CartModal open={true} setOpen={() => true} />
    </DataProvider>
  );
};

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

let mockCartItems: CartItemType[];
let mockShowModal: Mock;
let mockClose: Mock;

beforeEach(() => {
  mockCartItems = [...MOCK_CART_ITEMS];

  mockShowModal = vi.fn();
  mockClose = vi.fn();
  window.HTMLDialogElement.prototype.showModal = mockShowModal;
  window.HTMLDialogElement.prototype.close = mockClose;
});

describe('장바구니 아이템 조회 테스트', () => {
  it('장바구니 아이템의 세부 내용이 렌더링된다.', async () => {
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
    render(<TestCartModal />);

    await waitFor(() => {
      expect(screen.getByText('장바구니')).toBeInTheDocument();
    });

    const MUST_SHOW_INDEX = 1;
    const items = screen.getAllByTestId('modal-product-items');
    const item = items[MUST_SHOW_INDEX];
    const initialQuantity = mockCartItems[MUST_SHOW_INDEX].quantity;

    const increaseButtons = await screen.findAllByRole('button', {
      name: '아이템 수량 추가',
    });
    const increaseButton = increaseButtons[MUST_SHOW_INDEX];
    fireEvent.click(increaseButton);

    await waitFor(() => {
      expect(within(item).getByText(String(initialQuantity + 1))).toBeInTheDocument();
    });
  });

  it('- 버튼을 클릭했을 때 수량이 감소한다.', async () => {
    render(<TestCartModal />);

    await waitFor(() => {
      expect(screen.getByText('장바구니')).toBeInTheDocument();
    });

    const MUST_SHOW_INDEX = 1;
    const items = screen.getAllByTestId('modal-product-items');
    const item = items[MUST_SHOW_INDEX];
    const initialQuantity = mockCartItems[MUST_SHOW_INDEX].quantity;

    const decreaseButtons = await screen.findAllByRole('button', {
      name: '아이템 수량 감소',
    });
    const decreaseButton = decreaseButtons[MUST_SHOW_INDEX];
    fireEvent.click(decreaseButton);

    await waitFor(() => {
      expect(within(item).getByText(String(initialQuantity - 1))).toBeInTheDocument();
    });
  });
});

describe('장바구니 아이템 삭제 테스트', () => {
  it('삭제 버튼이 정상적으로 작동한다', async () => {
    render(<TestCartModal />);

    await waitFor(() => {
      expect(screen.getByText('장바구니')).toBeInTheDocument();
    });

    const MUST_SHOW_INDEX = 0;

    const deleteButtons = await screen.findAllByRole('button', {
      name: '삭제',
    });
    const deleteButton = deleteButtons[MUST_SHOW_INDEX];
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(
        screen.queryByText(mockCartItems[MUST_SHOW_INDEX].product.name),
      ).not.toBeInTheDocument();
    });
  });
});
