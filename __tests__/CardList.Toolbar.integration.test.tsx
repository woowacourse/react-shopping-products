// __tests__/ProductListToolBar.integration.test.tsx
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
import DataProvider from '../src/contexts/DataContextProvider';
import ProductListToolBar from '../src/components/ProductListToolBar';
import { useProducts } from '../src/hooks/useProducts';

const TestApp = () => {
  const { data, loading, error } = useProducts();

  return (
    <>
      <ProductListToolBar />
      {loading && <div data-testid="loading">로딩중...</div>}
      {error && <div data-testid="error">{error}</div>}
      {!loading && !error && (
        <div data-testid="product-list">
          {data?.map((p) => (
            <div key={p.id} data-testid="product-card">
              <span className="product-name">{p.name}</span> |
              <span className="product-category">{p.category}</span> |
              <span className="product-price">{p.price}</span>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

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

    render(
      <DataProvider>
        <TestApp />
      </DataProvider>
    );

    await act(async () => {
      await screen.findByTestId('product-list');
    });

    const cards = screen.getAllByTestId('product-card');
    expect(cards).toHaveLength(20);
    expect(
      cards.map((c) => c.querySelector('.product-name')!.textContent)
    ).toEqual([
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

  test('사용자가 “높은 가격순” 선택 시, sort=price,desc 요청 → 내림차순으로 화면 갱신', async () => {
    const sortDesc = 'price,desc';
    const filteredDesc = [...mockProducts].sort((a, b) => b.price - a.price);

    server.use(
      http.get('/products*', ({ request }) => {
        const url = new URL(request.url);
        expect(url.searchParams.get('sort')).toBe(sortDesc);
        return HttpResponse.json({ content: filteredDesc }, { status: 200 });
      })
    );

    render(
      <DataProvider>
        <TestApp />
      </DataProvider>
    );

    const sortingSelect = screen.getAllByRole('combobox');
    fireEvent.change(sortingSelect[1], { target: { value: '높은 가격순' } });

    await act(async () => {
      await screen.findByTestId('product-list');
    });

    const cards = screen.getAllByTestId('product-card');
    expect(cards).toHaveLength(20);
    expect(
      cards.map((c) => Number(c.querySelector('.product-price')!.textContent))
    ).toEqual([
      60000000, 11100000, 3210000, 850000, 800000, 200000, 200000, 100000,
      100000, 100000, 50000, 48000, 47000, 28000, 20000, 8130, 5000, 4800, 3800,
      100,
    ]);
  });

  test('사용자가 “낮은 가격순” 선택 시, sort=price,asc 요청 → 오름차순으로 화면 갱신', async () => {
    const sortAsc = 'price,asc';
    const filteredAsc = [...mockProducts].sort((a, b) => a.price - b.price);

    server.use(
      http.get('/products*', ({ request }) => {
        const url = new URL(request.url);
        expect(url.searchParams.get('sort')).toBe(sortAsc);
        return HttpResponse.json({ content: filteredAsc }, { status: 200 });
      })
    );

    render(
      <DataProvider>
        <TestApp />
      </DataProvider>
    );

    const sortingSelect = screen.getAllByRole('combobox');
    fireEvent.change(sortingSelect[1], { target: { value: '낮은 가격순' } });

    await act(async () => {
      await screen.findByTestId('product-list');
    });

    const cards = screen.getAllByTestId('product-card');
    expect(cards).toHaveLength(20);
    expect(
      cards.map((c) => Number(c.querySelector('.product-price')!.textContent))
    ).toEqual([
      100, 3800, 4800, 5000, 8130, 20000, 28000, 47000, 48000, 50000, 100000,
      100000, 100000, 200000, 200000, 800000, 850000, 3210000, 11100000,
      60000000,
    ]);
  });

  test.each(['패션잡화', '식료품'])(
    '사용자가 “카테고리=%s” 선택 시, category=%s 요청 → 카테고리 필터링된 결과만 화면에 보여줌',
    async (category) => {
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

      render(
        <DataProvider>
          <TestApp />
        </DataProvider>
      );

      const categorySelect = screen.getAllByRole('combobox');
      fireEvent.change(categorySelect[0], { target: { value: category } });

      await act(async () => {
        await screen.findByTestId('product-list');
      });

      const cards = screen.getAllByTestId('product-card');
      expect(cards.length).toBe(filteredCat.length);
      expect(
        cards.every(
          (card) =>
            card.querySelector('.product-category')?.textContent === category
        )
      ).toBe(true);
    }
  );
});
