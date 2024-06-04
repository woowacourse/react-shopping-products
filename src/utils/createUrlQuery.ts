import { ProductCategory, SortValue } from '@/types/product';

interface FetchProductListProps {
  size?: number;
  category: ProductCategory;
  page?: number;
  sortOptions?: SortValue;
}

/**
 *
 * 쿼리 스트링 생성 함수
 * @param category 카테고리
 * @param page 페이지
 * @param size 페이지 사이즈
 * @param sortOptions 정렬 옵션
 * @returns
 */
export const createUrlQuery = ({
  category,
  page,
  size,
  sortOptions,
}: FetchProductListProps): URLSearchParams => {
  return new URLSearchParams([
    ...(category && category !== 'all' ? [['category', category]] : []),
    ...(page || page === 0 ? [['page', page.toString()]] : []),
    ...(size ? [['size', size.toString()]] : []),
    ...(sortOptions ? [['sort', `price,${encodeURIComponent(sortOptions)}`]] : []),
  ]);
};
