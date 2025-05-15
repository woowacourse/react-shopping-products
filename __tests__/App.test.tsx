import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../src/App';
import getProducts from '../src/api/getProducts';
import getShoppingCart from '../src/api/getShoppingCart';
import postShoppingCart from '../src/api/postShoppingCart';
import deleteShoppingCart from '../src/api/deleteShoppingCart';
import type { MockedFunction } from 'vitest';

const mockedGetProducts = getProducts as MockedFunction<typeof getProducts>;
const mockedGetCart = getShoppingCart as MockedFunction<typeof getShoppingCart>;
const mockedPostCart = postShoppingCart as MockedFunction<
  typeof postShoppingCart
>;
const mockedDeleteCart = deleteShoppingCart as MockedFunction<
  typeof deleteShoppingCart
>;
const DUMMY = [
  {
    id: 24,
    name: '부리부리 원형 테이블',
    price: 3210000,
    imageUrl: 'https://example.com/table.jpg',
    category: '패션잡화',
  },
  {
    id: 25,
    name: '얌샘김밥',
    price: 5000,
    imageUrl: 'https://example.com/gimbap.png',
    category: '식료품',
  },
];

const CART_DUMMY = [
  {
    id: 836,
    quantity: 1,
    product: {
      id: 27,
      name: '아바라',
      price: 4800,
      imageUrl: 'https://example.com/abara.jpg',
      category: '식료품',
    },
  },
  {
    id: 920,
    quantity: 1,
    product: {
      id: 24,
      name: '부리부리 원형 테이블',
      price: 3210000,
      imageUrl: 'https://example.com/table.jpg',
      category: '패션잡화',
    },
  },
];

const SINGLE_ITEM = [CART_DUMMY[1]];

vi.mock('../src/api/getProducts', () => ({
  __esModule: true,
  default: vi.fn(),
}));
vi.mock('../src/api/getShoppingCart', () => ({
  __esModule: true,
  default: vi.fn(),
}));
vi.mock('../src/api/postShoppingCart', () => ({
  __esModule: true,
  default: vi.fn(),
}));
vi.mock('../src/api/deleteShoppingCart', () => ({
  __esModule: true,
  default: vi.fn(),
}));

describe('<App />', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mockedGetProducts.mockResolvedValue({ content: DUMMY });
    mockedPostCart.mockResolvedValue();
    mockedDeleteCart.mockResolvedValue();
  });

  it('장바구니 제거 시 cart-count가 2 → 1로 감소한다', async () => {
    mockedGetCart
      .mockResolvedValueOnce({ content: CART_DUMMY })
      .mockResolvedValueOnce({ content: SINGLE_ITEM });

    render(<App />);

    const count2 = await screen.findByTestId('cart-count');
    expect(count2).toHaveTextContent('2');

    const itemSpan = screen.getByText('부리부리 원형 테이블');
    const itemLi = itemSpan.closest('li')!;
    const removeBtn = within(itemLi).getByText('빼기');
    await userEvent.click(removeBtn);

    await waitFor(() => expect(mockedDeleteCart).toHaveBeenCalledWith(920));

    await waitFor(() => expect(mockedGetCart).toHaveBeenCalledTimes(2));

    const count1 = await screen.findByTestId('cart-count');
    expect(count1).toHaveTextContent('1');
  });

  it('장바구니 추가 시 cart-count가 1 → 2로 증가한다', async () => {
    mockedGetCart
      .mockResolvedValueOnce({ content: [CART_DUMMY[0]] })
      .mockResolvedValueOnce({ content: CART_DUMMY });

    render(<App />);

    const initialCount = await screen.findByTestId('cart-count');
    expect(initialCount).toHaveTextContent('1');

    const itemSpan = screen.getByText('부리부리 원형 테이블');
    const itemLi = itemSpan.closest('li')!;
    const addBtn = within(itemLi).getByText('담기');
    await userEvent.click(addBtn);

    await waitFor(() => expect(mockedGetCart).toHaveBeenCalledTimes(2));

    const updatedCount = await screen.findByTestId('cart-count');
    expect(updatedCount).toHaveTextContent('2');
  });
});
