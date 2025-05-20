import { describe, expect, it } from 'vitest';
import { BASE_URL } from '../../src/constants/endpoint';
import getQueryURL from '../../src/utils/getQueryURL';

describe('getQueryURL 유틸 함수 테스트', () => {
  it.each([
    [{ category: 'grocery' }, BASE_URL + '?category=grocery'],
    [{ page: '0', size: '20' }, BASE_URL + '?page=0&size=20'],
    [{ sort: 'price,asc' }, BASE_URL + '?sort=price%2Casc'],
  ])('주어진 쿼리문(%s)이 추가된 URL를 반환한다.', (query, result) => {
    expect(getQueryURL(BASE_URL, query)).toBe(result);
  });
});
