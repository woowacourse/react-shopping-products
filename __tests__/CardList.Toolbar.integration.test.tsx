import React from 'react';
import {
  render,
  screen,
  act,
  fireEvent,
  cleanup,
} from '@testing-library/react';
import { describe, test, expect, beforeAll, afterEach, afterAll } from 'vitest';
import mockProducts from '../src/mocks/products.json';
import { http, HttpResponse } from 'msw';
import { server } from './setupTests';
import App from '../src/App';

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());

describe('ProductListToolBar + ProductCardList 통합 테스트', () => {
  test('초기 렌더 시 기본 sort=price,asc, category=전체로 API 호출 후 화면에 20개 항목 보여준다.', async () => {
    const defaultSort = 'price,asc';
    const filteredAsc = [...mockProducts].sort((a, b) => a.price - b.price);

    server.use(
      http.get('/products*', ({ request }) => {
        const url = new URL(request.url);
        expect(url.searchParams.get('sort')).toBe(defaultSort);
        expect(url.searchParams.get('category')).toBeNull();
        return HttpResponse.json({ content: filteredAsc }, { status: 200 });
      })
    );

    render(<App />);

    await act(async () => {
      await screen.findByTestId('product-list');
    });

    const cardNames = screen.getAllByTestId('product-name');
    expect(cardNames).toHaveLength(20);
    expect(cardNames.map((c) => c.textContent)).toEqual([
      '기세',
      '아샷추',
      '아바라',
      '얌샘김밥',
      '플라망고',
      '동물 양말',
      '달 무드등',
      '민초 치킨',
      '민초 피자',
      '앵그리버드',
      '에어포스1',
      '에어포스2',
      '에어포스3',
      '너에게난~ 해질녘 노을처럼~',
      '앵버잠옷',
      '튀김 신발',
      '19x19x19 큐브',
      '부리부리 원형 테이블',
      '메이통통이',
      '리바이 아커만',
    ]);
  });

  test('사용자가 “높은 가격순” 선택 시, sort=price,desc 요청 → 내림차순으로 화면 갱신한다.', async () => {
    const sortDesc = 'price,desc';
    const filteredDesc = [...mockProducts].sort((a, b) => b.price - a.price);

    server.use(
      http.get('/products*', ({ request }) => {
        const url = new URL(request.url);
        expect(url.searchParams.get('sort')).toBe(sortDesc);
        return HttpResponse.json({ content: filteredDesc }, { status: 200 });
      })
    );

    render(<App />);

    const sortingSelect = screen.getAllByRole('combobox');
    fireEvent.change(sortingSelect[1], { target: { value: '높은 가격순' } });

    await act(async () => {
      await screen.findByTestId('product-list');
    });

    const cardPrices = screen.getAllByTestId('product-price');
    expect(cardPrices).toHaveLength(20);
    expect(
      cardPrices.map((c) =>
        Number(c.textContent?.replace(/,/g, '').replace('원', ''))
      )
    ).toEqual([
      60000000, 11100000, 3210000, 850000, 800000, 200000, 200000, 100000,
      100000, 100000, 50000, 48000, 47000, 28000, 20000, 8130, 5000, 4800, 3800,
      100,
    ]);
  });

  test('사용자가 “낮은 가격순” 선택 시, sort=price,asc 요청 → 오름차순으로 화면 갱신한다.', async () => {
    const sortAsc = 'price,asc';
    const filteredAsc = [...mockProducts].sort((a, b) => a.price - b.price);

    server.use(
      http.get('/products*', ({ request }) => {
        const url = new URL(request.url);
        expect(url.searchParams.get('sort')).toBe(sortAsc);
        return HttpResponse.json({ content: filteredAsc }, { status: 200 });
      })
    );

    render(<App />);

    const sortingSelect = screen.getAllByRole('combobox');
    fireEvent.change(sortingSelect[1], { target: { value: '낮은 가격순' } });

    await act(async () => {
      await screen.findByTestId('product-list');
    });

    const cardPrices = screen.getAllByTestId('product-price');
    expect(cardPrices).toHaveLength(20);
    expect(
      cardPrices.map((c) =>
        Number(c.textContent?.replace(/,/g, '').replace('원', ''))
      )
    ).toEqual([
      100, 3800, 4800, 5000, 8130, 20000, 28000, 47000, 48000, 50000, 100000,
      100000, 100000, 200000, 200000, 800000, 850000, 3210000, 11100000,
      60000000,
    ]);
  });

  test('사용자가 “패션잡화” 선택 시, category=패션잡화 요청 → 카테고리 필터링된 결과만 화면에 보여준다.', async () => {
    const category = '패션잡화';
    const filteredCat = [...mockProducts].filter(
      (p) => p.category === category
    );

    server.use(
      http.get('/products*', ({ request }) => {
        const url = new URL(request.url);
        expect(url.searchParams.get('category')).toBe(category);
        return HttpResponse.json({ content: filteredCat }, { status: 200 });
      })
    );

    render(<App />);

    const categorySelect = screen.getAllByRole('combobox');
    fireEvent.change(categorySelect[0], { target: { value: category } });

    await act(async () => {
      await screen.findByTestId('product-list');
    });

    const cardNames = screen.getAllByTestId('product-name');
    expect(cardNames.length).toBe(12);
    expect(cardNames.map((c) => c.textContent)).toEqual([
      '동물 양말',
      '달 무드등',
      '앵그리버드',
      '에어포스1',
      '에어포스2',
      '에어포스3',
      '너에게난~ 해질녘 노을처럼~',
      '앵버잠옷',
      '튀김 신발',
      '19x19x19 큐브',
      '부리부리 원형 테이블',
      '리바이 아커만',
    ]);
  });

  test('사용자가 "식료품" 선택 시, category=식료품 요청 → 카테고리 필터링된 결과만 화면에 보여준다.', async () => {
    const category = '식료품';
    const filteredCat = [...mockProducts].filter(
      (p) => p.category === category
    );

    server.use(
      http.get('/products*', ({ request }) => {
        const url = new URL(request.url);
        expect(url.searchParams.get('category')).toBe(category);
        return HttpResponse.json({ content: filteredCat }, { status: 200 });
      })
    );

    render(<App />);

    const categorySelect = screen.getAllByRole('combobox');
    fireEvent.change(categorySelect[0], { target: { value: category } });

    await act(async () => {
      await screen.findByTestId('product-list');
    });

    const cardNames = screen.getAllByTestId('product-name');
    expect(cardNames.length).toBe(8);
    expect(cardNames.map((c) => c.textContent)).toEqual([
      '기세',
      '아샷추',
      '아바라',
      '얌샘김밥',
      '플라망고',
      '민초 치킨',
      '민초 피자',
      '메이통통이',
    ]);
  });
});
