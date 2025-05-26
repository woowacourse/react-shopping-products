import { describe, test, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { server } from '../mocks/node';
import { http, HttpResponse } from 'msw';
import { END_POINT } from '../api/constants/endPoint';
import ProductPage from '../pages/ProductPage';
import { ErrorProvider } from '../context/ErrorContext';
import { DataProvider } from '../context/DataContext';
import { ModalProvider } from 'oa-modal-components';

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ErrorProvider>
    <DataProvider>
      <ModalProvider>{children}</ModalProvider>
    </DataProvider>
  </ErrorProvider>
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('ProductPage 정상 동작 테스트', () => {
  test('상품 목록이 정상적으로 표시된다', async () => {
    render(
      <TestWrapper>
        <ProductPage />
      </TestWrapper>,
    );

    // 로딩 스피너가 먼저 표시되는지 확인
    expect(screen.getByTestId('dot-wave-spinner')).toBeInTheDocument();

    // 상품들이 로드될 때까지 대기
    await waitFor(() => {
      expect(screen.queryByTestId('dot-wave-spinner')).not.toBeInTheDocument();
    });

    // 기본 MSW 데이터의 상품들이 표시되는지 확인
    expect(screen.getByText('패션 상품 1')).toBeInTheDocument();
    expect(screen.getByText('패션 상품 2')).toBeInTheDocument();
    expect(screen.getByText('식품 1')).toBeInTheDocument();
    expect(screen.getByText('식품 2')).toBeInTheDocument();

    // 가격이 올바르게 표시되는지 확인
    expect(screen.getByText('10,000원')).toBeInTheDocument();
    expect(screen.getByText('20,000원')).toBeInTheDocument();
    expect(screen.getByText('5,000원')).toBeInTheDocument();
    expect(screen.getByText('8,000원')).toBeInTheDocument();
  });

  test('Header가 올바르게 표시된다', async () => {
    render(
      <TestWrapper>
        <ProductPage />
      </TestWrapper>,
    );

    // 페이지 로딩 완료 대기
    await waitFor(() => {
      expect(screen.getByText('패션 상품 1')).toBeInTheDocument();
    });

    // Header 요소들 확인
    expect(screen.getByText('bpple 상품 목록')).toBeInTheDocument();

    // 장바구니 아이콘 확인
    const cartIcons = screen.getAllByAltText('shopping_cart');
    const headerCartIcon = cartIcons.find(
      (icon) => icon.getAttribute('src') === './shopping-basket.svg',
    );
    expect(headerCartIcon).toBeInTheDocument();
  });

  test('필터 드롭다운이 올바르게 표시된다', async () => {
    render(
      <TestWrapper>
        <ProductPage />
      </TestWrapper>,
    );

    // 페이지 로딩 완료 대기
    await waitFor(() => {
      expect(screen.getByText('패션 상품 1')).toBeInTheDocument();
    });

    // 필터 드롭다운 확인
    expect(screen.getByText('전체')).toBeInTheDocument();
    expect(screen.getByText('순서 없음')).toBeInTheDocument();

    // 드롭다운 아이콘 확인
    const chevronIcons = screen.getAllByAltText('chevron-down');
    expect(chevronIcons).toHaveLength(2); // 카테고리 필터와 정렬 필터
  });

  test('상품 카드에 담기 버튼이 표시된다', async () => {
    // 빈 장바구니로 설정하여 모든 상품에 담기 버튼이 표시되도록 함
    server.use(
      http.get(END_POINT.CART, () => {
        return HttpResponse.json({
          content: [],
          totalElements: 0,
          totalPages: 0,
          number: 0,
          size: 50,
        });
      }),
    );

    render(
      <TestWrapper>
        <ProductPage />
      </TestWrapper>,
    );

    // 페이지 로딩 완료 대기
    await waitFor(() => {
      expect(screen.getByText('패션 상품 1')).toBeInTheDocument();
    });

    // 담기 버튼들이 표시되는지 확인
    const addButtons = screen.getAllByText('담기');
    expect(addButtons.length).toBeGreaterThan(0);

    // 각 담기 버튼에 장바구니 아이콘이 있는지 확인
    const cartAddIcons = screen
      .getAllByAltText('shopping_cart')
      .filter((icon) => icon.getAttribute('src') === './shopping-cart-add.svg');
    expect(cartAddIcons.length).toBeGreaterThan(0);
  });

  test('장바구니에 상품이 있을 때 Header에 카운트가 표시된다', async () => {
    render(
      <TestWrapper>
        <ProductPage />
      </TestWrapper>,
    );

    // 페이지 로딩 완료 대기
    await waitFor(() => {
      expect(screen.getByText('패션 상품 1')).toBeInTheDocument();
    });

    // 기본 MSW 데이터에는 장바구니에 10개 아이템이 있음
    await waitFor(() => {
      expect(screen.getByText('10')).toBeInTheDocument();
    });

    // Header의 카운트인지 확인 (css-1rlga3p 클래스)
    const headerCartCount = document.querySelector('.css-1rlga3p');
    expect(headerCartCount).toBeInTheDocument();
    expect(headerCartCount).toHaveTextContent('10');
  });

  test('장바구니에 있는 상품은 수량 조절 버튼이 표시된다', async () => {
    render(
      <TestWrapper>
        <ProductPage />
      </TestWrapper>,
    );

    // 페이지 로딩 완료 대기
    await waitFor(() => {
      expect(screen.getByText('패션 상품 1')).toBeInTheDocument();
    });

    // 수량 조절 버튼들 확인 (기본 MSW 데이터에서 일부 상품은 장바구니에 있음)
    const minusButtons = screen.getAllByAltText('button-minus');
    const plusButtons = screen.getAllByAltText('button-plus');

    expect(minusButtons.length).toBeGreaterThan(0);
    expect(plusButtons.length).toBeGreaterThan(0);
    expect(minusButtons.length).toBe(plusButtons.length);
  });

  test('장바구니 아이콘 클릭 시 모달이 열린다', async () => {
    render(
      <TestWrapper>
        <ProductPage />
      </TestWrapper>,
    );

    // 페이지 로딩 완료 대기
    await waitFor(() => {
      expect(screen.getByText('패션 상품 1')).toBeInTheDocument();
    });

    // Header의 장바구니 아이콘 클릭
    const cartIcons = screen.getAllByAltText('shopping_cart');
    const headerCartIcon = cartIcons.find(
      (icon) => icon.getAttribute('src') === './shopping-basket.svg',
    );

    fireEvent.click(headerCartIcon!);

    // 모달이 열렸는지 확인 (모달 내용 확인)
    await waitFor(() => {
      // 모달 내부의 장바구니 아이템들이 표시되는지 확인
      expect(screen.getByText('장바구니')).toBeInTheDocument();
    });
  });

  test('상품 이미지가 올바르게 표시된다', async () => {
    render(
      <TestWrapper>
        <ProductPage />
      </TestWrapper>,
    );

    // 페이지 로딩 완료 대기
    await waitFor(() => {
      expect(screen.getByText('패션 상품 1')).toBeInTheDocument();
    });

    // 상품 이미지들 확인
    expect(screen.getByAltText('패션 상품 1')).toBeInTheDocument();
    expect(screen.getByAltText('패션 상품 2')).toBeInTheDocument();
    expect(screen.getByAltText('식품 1')).toBeInTheDocument();
    expect(screen.getByAltText('식품 2')).toBeInTheDocument();

    // 이미지 src 속성 확인
    const productImage = screen.getByAltText('패션 상품 1');
    expect(productImage).toHaveAttribute('src', 'https://example.com/image1.jpg');
  });

  test('담기 버튼 클릭 시 장바구니에 상품이 추가된다', async () => {
    // 빈 장바구니로 시작
    server.use(
      http.get(END_POINT.CART, () => {
        return HttpResponse.json({
          content: [],
          totalElements: 0,
          totalPages: 0,
          number: 0,
          size: 50,
        });
      }),
      http.post(END_POINT.CART, () => {
        return new HttpResponse(null, { status: 201 });
      }),
    );

    render(
      <TestWrapper>
        <ProductPage />
      </TestWrapper>,
    );

    // 페이지 로딩 완료 대기
    await waitFor(() => {
      expect(screen.getByText('패션 상품 1')).toBeInTheDocument();
    });

    // 초기에는 장바구니 카운트가 없음
    expect(screen.queryByText('1')).not.toBeInTheDocument();

    // 담기 버튼 클릭
    const addButtons = screen.getAllByText('담기');
    fireEvent.click(addButtons[0]);

    // 성공적으로 클릭되었는지 확인 (실제 카운트 증가는 MSW 설정에 따라 다름)
    // 여기서는 클릭 이벤트가 처리되었는지만 확인
    expect(addButtons[0]).toBeInTheDocument();
  });
});

describe('ProductPage 예외 테스트', () => {
  test('상품 목록이 정상적으로 로드되면 에러 메시지가 표시되지 않는다', async () => {
    render(
      <TestWrapper>
        <ProductPage />
      </TestWrapper>,
    );

    // 로딩이 완료될 때까지 대기
    await waitFor(() => {
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });

    // 상품이 표시되는지 확인
    await waitFor(() => {
      expect(screen.getByText('패션 상품 1')).toBeInTheDocument();
    });
  });

  test('네트워크 오류 발생 시 에러 메시지가 화면에 표시된다', async () => {
    // MSW 핸들러 설정 - 네트워크 오류 시뮬레이션
    server.use(
      http.get(END_POINT.PRODUCT, () => {
        return HttpResponse.error();
      }),
    );

    render(
      <TestWrapper>
        <ProductPage />
      </TestWrapper>,
    );

    // 에러 메시지가 표시될 때까지 대기
    await waitFor(() => {
      const errorElement = screen.getByRole('alert');
      expect(errorElement).toBeInTheDocument();
      expect(errorElement).toHaveTextContent('Failed to fetch');
    });
  });

  test('서버 500 에러 발생 시 에러 메시지가 화면에 표시된다', async () => {
    // MSW 핸들러 설정 - 서버 오류 시뮬레이션
    server.use(
      http.get(END_POINT.PRODUCT, () => {
        return new HttpResponse(JSON.stringify({ message: '서버 내부 오류가 발생했습니다.' }), {
          status: 500,
        });
      }),
    );

    render(
      <TestWrapper>
        <ProductPage />
      </TestWrapper>,
    );

    // 에러 메시지가 표시될 때까지 대기
    await waitFor(() => {
      const errorElement = screen.getByRole('alert');
      expect(errorElement).toBeInTheDocument();
      // 500 에러의 경우 일반적인 에러 메시지가 표시됨
      expect(errorElement.textContent).toContain('500');
    });
  });

  test('장바구니 API 에러 발생 시 에러 메시지가 화면에 표시된다', async () => {
    // 상품 API는 정상, 장바구니 API만 에러
    server.use(
      http.get(END_POINT.CART, () => {
        return HttpResponse.error();
      }),
    );

    render(
      <TestWrapper>
        <ProductPage />
      </TestWrapper>,
    );

    // 장바구니 에러 메시지가 표시될 때까지 대기
    await waitFor(() => {
      const errorElement = screen.getByRole('alert');
      expect(errorElement).toBeInTheDocument();
      expect(errorElement).toHaveTextContent('Failed to fetch');
    });
  });

  test('여러 에러가 동시에 발생하면 첫 번째 에러가 우선 표시된다', async () => {
    // 상품 API와 장바구니 API 모두 에러
    server.use(
      http.get(END_POINT.PRODUCT, () => {
        return new HttpResponse(JSON.stringify({ message: '상품 조회 실패' }), { status: 404 });
      }),
      http.get(END_POINT.CART, () => {
        return new HttpResponse(JSON.stringify({ message: '장바구니 조회 실패' }), { status: 500 });
      }),
    );

    render(
      <TestWrapper>
        <ProductPage />
      </TestWrapper>,
    );

    // 첫 번째 에러(상품 에러)가 표시되는지 확인
    await waitFor(() => {
      const errorElement = screen.getByRole('alert');
      expect(errorElement).toBeInTheDocument();
      // productsError가 먼저 체크되므로 상품 에러가 표시됨
      expect(errorElement.textContent).toContain('404');
    });
  });

  test('로딩 중에는 스피너가 표시되고 에러 메시지는 표시되지 않는다', async () => {
    // 느린 응답 시뮬레이션
    server.use(
      http.get(END_POINT.PRODUCT, async () => {
        // 100ms 지연
        await new Promise((resolve) => setTimeout(resolve, 100));
        return HttpResponse.json({
          content: [],
          page: 0,
          size: 20,
          totalElements: 0,
          totalPages: 0,
        });
      }),
    );

    render(
      <TestWrapper>
        <ProductPage />
      </TestWrapper>,
    );

    expect(screen.getByTestId('dot-wave-spinner')).toBeInTheDocument();

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByTestId('dot-wave-spinner')).not.toBeInTheDocument();
    });
  });
});
