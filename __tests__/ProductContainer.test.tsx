import { render, screen, waitFor } from '@testing-library/react';
import ProductListContainer from '../src/Component/Product/ProductListContainer';
import * as productApi from '../src/api/getProducts';
import { vitest } from 'vitest';
import userEvent from '@testing-library/user-event';

const mockUpdateCartItems = vitest.fn();
const mockGetMatchCartItem = vitest.fn();
const mockUpdateErrorMessage = vitest.fn();

const DUMMY = [
  {
    id: 24,
    name: '부리부리 원형 테이블',
    price: 3210000,
    imageUrl:
      'https://cafe24.poxo.com/ec01/dmswo9075/HOvhRhvOk+Cp2KY4JuusAqBst4wtnsfbyXcejHyxMmXKvNELh5kEAFzUfK9ehG6ogDMwTwYJTLHHXeYVBq809g==/_/web/product/big/202408/19deee5e9d060d80a4180e2b2ecb6ce8.jpg',
    category: '패션잡화',
  },
  {
    id: 25,
    name: '얌샘김밥',
    price: 5000,
    imageUrl:
      'https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20171018_6%2F1508253136417Dlrjh_PNG%2FCdq22zpVpr92_XHROlHbxjJ0.png&type=sc960_832',
    category: '식료품',
  },
];

describe('ProductListContainer', () => {
  afterEach(() => {
    vitest.clearAllMocks();
    vitest.resetAllMocks();
  });

  it('상품 목록을 성공적으로 렌더링한다', async () => {
    vitest.spyOn(productApi, 'default').mockResolvedValue({
      content: DUMMY,
    });

    render(
      <ProductListContainer
        cartItems={[]}
        updateCartItems={mockUpdateCartItems}
        getMatchCartItem={mockGetMatchCartItem}
        updateErrorMessage={mockUpdateErrorMessage}
      />
    );

    await waitFor(() => {
      expect(screen.getByText('부리부리 원형 테이블')).toBeInTheDocument();
      expect(screen.getByText('3,210,000원')).toBeInTheDocument();
      expect(screen.getByText('얌샘김밥')).toBeInTheDocument();
      expect(screen.getByText('5,000원')).toBeInTheDocument();
    });
  });

  it('카테고리 식료품을 선택하면 식료품만 나타난다.', async () => {
    vitest
      .spyOn(productApi, 'default')
      .mockResolvedValueOnce({ content: DUMMY })
      .mockResolvedValueOnce({
        content: DUMMY.filter((p) => p.category === '패션잡화'),
      });

    render(
      <ProductListContainer
        cartItems={[]}
        updateCartItems={mockUpdateCartItems}
        getMatchCartItem={mockGetMatchCartItem}
        updateErrorMessage={mockUpdateErrorMessage}
      />
    );

    const selectElement = screen.getByRole('combobox', { name: '카테고리' });
    const option = screen.getByRole('option', { name: '패션잡화' });

    await userEvent.selectOptions(selectElement, option);

    await waitFor(() => {
      expect(screen.getByText('부리부리 원형 테이블')).toBeInTheDocument();
      expect(screen.getByText('3,210,000원')).toBeInTheDocument();
      expect(screen.queryByText('얌샘김밥')).toBeNull();
      expect(screen.queryByText('5,000원')).toBeNull();
    });
  });

  it('카테고리 패션잡화를 선택하면 식료품만 나타난다.', async () => {
    vitest
      .spyOn(productApi, 'default')
      .mockResolvedValueOnce({ content: DUMMY })
      .mockResolvedValueOnce({
        content: DUMMY.filter((p) => p.category === '식료품'),
      });

    render(
      <ProductListContainer
        cartItems={[]}
        updateCartItems={mockUpdateCartItems}
        getMatchCartItem={mockGetMatchCartItem}
        updateErrorMessage={mockUpdateErrorMessage}
      />
    );

    const selectElement = screen.getByRole('combobox', { name: '카테고리' });
    const option = screen.getByRole('option', { name: '식료품' });

    await userEvent.selectOptions(selectElement, option);

    await waitFor(() => {
      expect(screen.queryByText('부리부리 원형 테이블')).toBeNull();
      expect(screen.queryByText('3,210,000원')).toBeNull();
      expect(screen.getByText('얌샘김밥')).toBeInTheDocument();
      expect(screen.getByText('5,000원')).toBeInTheDocument();
    });
  });
});
