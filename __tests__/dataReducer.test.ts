import { dataReducer } from '../src/contexts/dataReducer';
import { ApiContextState } from '../src/APIs/api.type';
import { Product } from '../src/components/ProductCardList/product.type';
import { CartItem } from '../src/components/ShoppingCartModal/cart.type';
import { DataAction } from '../src/contexts/data.type';
import { describe, test, expect } from 'vitest';

describe('dataReducer 테스트', () => {
  const initialState: ApiContextState<CartItem[] | Product[]> = {
    products: { data: [], loading: true, error: '' },
    cartItems: { data: [], loading: true, error: '' },
  };

  test('SET_DATA: products.data 갱신 및 loading=false, error=""로 할당한다.', () => {
    const action: DataAction = {
      type: 'SET_DATA',
      key: 'products',
      data: [{ id: 1, name: '테스트상품', price: 100 }] as Product[],
    };

    const newState = dataReducer(initialState, action);

    expect(newState.products.data).toEqual(action.data);
    expect(newState.products.loading).toBe(false);
    expect(newState.products.error).toBe('');
    expect(newState.cartItems).toEqual(initialState.cartItems);

    expect(initialState.products.data).toEqual([]);
    expect(newState).not.toBe(initialState);
  });

  test('SET_ERROR: cartItems.error 설정 및 loading=false로 할당한다.', () => {
    const action: DataAction = {
      type: 'SET_ERROR',
      key: 'cartItems',
      error: '네트워크 에러 발생',
    };

    const newState = dataReducer(initialState, action);

    expect(newState.cartItems.error).toBe('네트워크 에러 발생');
    expect(newState.cartItems.loading).toBe(false);
    expect(newState.products).toEqual(initialState.products);
    expect(initialState.cartItems.error).toBe('');
    expect(newState).not.toBe(initialState);
  });

  test('CLEAR_ERROR: cartItems.error가 빈 문자열로 할당된다.', () => {
    const errorAction: DataAction = {
      type: 'SET_ERROR',
      key: 'cartItems',
      error: '네트워크 에러 발생',
    };
    const intermediateState = dataReducer(initialState, errorAction);

    const clearErrorAction: DataAction = {
      type: 'CLEAR_ERROR',
      key: 'cartItems',
    };
    const newState = dataReducer(intermediateState, clearErrorAction);

    expect(newState.cartItems.error).toBe('');
    expect(intermediateState.cartItems.error).toBe('네트워크 에러 발생');
    expect(newState).not.toBe(intermediateState);
  });

  test('SET_LOADING: cartItems.loading 값을 변경한다.', () => {
    const action: DataAction = {
      type: 'SET_LOADING',
      key: 'cartItems',
      loading: false,
    };

    const newState = dataReducer(initialState, action);

    expect(newState.cartItems.loading).toBe(false);
    expect(newState.cartItems.error).toBe('');
    expect(newState.cartItems.data).toEqual([]);
    expect(newState).not.toBe(initialState);
  });

  test('SET_CATEGORY: products.category 값을 변경한다.', () => {
    const prevProducts = {
      data: [],
      loading: true,
      error: '',
      category: '전체',
      sort: 'price,asc',
    };
    const stateWithCategory = { ...initialState, products: prevProducts };

    const action: DataAction = {
      type: 'SET_CATEGORY',
      key: 'products',
      category: '패션잡화',
    };

    const newState = dataReducer(stateWithCategory, action);

    expect(newState.products.category).toBe('패션잡화');
    expect(newState.products.sort).toBe('price,asc');
    expect(newState).not.toBe(stateWithCategory);
  });

  test('SET_SORT: products.sort 값을 변경한다.', () => {
    const prevProducts = {
      data: [],
      loading: true,
      error: '',
      category: '전체',
      sort: 'price,asc',
    };
    const stateWithSort = { ...initialState, products: prevProducts };

    const action: DataAction = {
      type: 'SET_SORT',
      key: 'products',
      sort: 'price,desc',
    };

    const newState = dataReducer(stateWithSort, action);

    expect(newState.products.sort).toBe('price,desc');
    expect(newState.products.category).toBe('전체');
    expect(newState).not.toBe(stateWithSort);
  });

  test('UNKNOWN 액션: state를 변경하지 않고 그대로 반환한다.', () => {
    const action = {
      type: 'UNKNOWN',
      key: 'products',
    } as unknown as DataAction;
    const newState = dataReducer(initialState, action);
    expect(newState).toBe(initialState);
  });
});
