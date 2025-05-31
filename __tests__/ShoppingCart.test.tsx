import React from 'react';
import {
  render,
  screen,
  act,
  fireEvent,
  cleanup,
} from '@testing-library/react';
import { describe, test, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from './setupTests';
import mockProducts from '../src/mocks/products.json';
import { CartItem } from '../src/components/ShoppingCartModal/cart.type';
import App from '../src/App';
import { Product } from '../src/components/ProductCardList/product.type';
import { cartItems } from '../src/mocks/handlers';

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());

describe('장바구니 완전 통합 테스트', () => {
  test('“담기” 버튼 클릭 시, POST/GET 요청 후 header 뱃지에 “1” 표시한다.', async () => {
    server.use(
      http.post('/cart-items', async ({ request }) => {
        const body = await request.json();
        const productId = (body as { productId: number }).productId;
        const quantity = (body as { quantity: number }).quantity;

        const product = mockProducts.find((p) => p.id === productId)!;
        const newItem = {
          id: cartItems.length + 1,
          product,
          quantity,
        };
        cartItems.push(newItem as unknown as CartItem);

        return HttpResponse.json({ content: cartItems }, { status: 201 });
      })
    );

    render(<App />);

    await act(async () => {
      await screen.findByTestId('product-list');
    });

    expect(screen.queryByTestId('cart-badge')).not.toBeInTheDocument();

    const addButtons = screen.getAllByRole('button', { name: /담기/i });

    await act(async () => {
      fireEvent.click(addButtons[0]);
    });

    const cartBadge = screen.getByTestId('cart-badge');
    expect(cartBadge.textContent).toBe('1');
  });

  test('“삭제” 버튼 클릭 시, DELETE 요청 후 뱃지가 사라진다.', async () => {
    server.use(
      http.delete('/cart-items/:cartItemId', async ({ request }) => {
        const idNum = Number(request.url.split('/').pop());
        cartItems.splice(
          cartItems.findIndex((ci) => ci.id === idNum),
          1
        );
        return HttpResponse.json({ content: cartItems }, { status: 204 });
      })
    );

    render(<App />);

    await act(async () => {
      await screen.findByTestId('product-list');
    });

    const cartBadge = screen.getByTestId('cart-badge');
    expect(cartBadge.textContent).toBe('1');

    const cartButton = screen.getByTestId('cart-button');
    fireEvent.click(cartButton);

    const removeButtons = await screen.findAllByRole('button', {
      name: '삭제',
    });
    expect(removeButtons.length).toBeGreaterThan(0);

    await act(async () => {
      fireEvent.click(removeButtons[0]);
    });
    expect(screen.queryByTestId('cart-badge')).not.toBeInTheDocument();
  });

  test('“수량(+)" 버튼 클릭 시, PATCH 요청 후 모달 내부 숫자 증가한다.', async () => {
    cartItems.push({
      id: 7,
      product: mockProducts[6] as unknown as Product,
      quantity: 1,
    });

    server.use(
      http.patch('/cart-items/:cartItemId', async ({ request }) => {
        const idNum = Number(request.url.split('/').pop());
        const body = await request.json();
        const newQty = (body as { quantity: number }).quantity;
        const item = cartItems.find((ci) => ci.id === idNum);
        if (item) {
          item.quantity = newQty;
          return HttpResponse.json({ content: cartItems }, { status: 200 });
        }
        return HttpResponse.json({ content: null }, { status: 404 });
      })
    );

    render(<App />);

    await act(async () => {
      await screen.findByTestId('product-list');
    });

    const cartBadge = screen.getByTestId('cart-badge');
    expect(cartBadge.textContent).toBe('1');

    const cartButton = screen.getByTestId('cart-button');
    fireEvent.click(cartButton);

    const addQtyButtons = await screen.findAllByRole('button', { name: '+' });
    expect(addQtyButtons.length).toBeGreaterThan(0);

    await act(async () => {
      fireEvent.click(addQtyButtons[0]);
    });

    const qtyDisplay = screen.getAllByTestId('cart-item-quantity');
    expect(qtyDisplay[0].textContent).toBe('2');
  });

  test('“수량(-)" 버튼 클릭 시, PATCH 요청 후 모달 내부 숫자 감소한다.', async () => {
    server.use(
      http.patch('/cart-items/:cartItemId', async ({ request }) => {
        const idNum = Number(request.url.split('/').pop());
        const body = await request.json();
        const newQty = (body as { quantity: number }).quantity;
        const item = cartItems.find((ci) => ci.id === idNum);
        if (item) {
          item.quantity = newQty;
          return HttpResponse.json({ content: cartItems }, { status: 200 });
        }
        return HttpResponse.json({ content: null }, { status: 404 });
      })
    );

    render(<App />);

    await act(async () => {
      await screen.findByTestId('product-list');
    });

    const cartBadge = screen.getByTestId('cart-badge');
    expect(cartBadge.textContent).toBe('1');

    const cartButton = screen.getByTestId('cart-button');
    fireEvent.click(cartButton);

    const addQtyButtons = await screen.findAllByRole('button', { name: '-' });
    expect(addQtyButtons.length).toBeGreaterThan(0);

    await act(async () => {
      fireEvent.click(addQtyButtons[0]);
    });

    const qtyDisplay = screen.getAllByTestId('cart-item-quantity');
    expect(qtyDisplay[0].textContent).toBe('1');
  });
});
