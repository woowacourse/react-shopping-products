import { SmartURLSearchParams } from "@utils/SmartURLSearchParams";
import { CATEGORY_OPTIONS, PRODUCT_QUERY_PARAMS } from "@apis/__constants__/productQueryParams";

const PAGE_SIZE = 4;
const INITIAL_PAGE_SIZE = 20;

// 첫 로드 시 불러온 20개를 건너뛰기 위해 페이지 1부터는 조정값 4를 더해줌
const PAGE_ADJUSTMENT = 4;

export const adjustProductQueryParams = (
  queryParams: SmartURLSearchParams
): SmartURLSearchParams => {
  const params = new SmartURLSearchParams(queryParams);

  const page = Number(params.get(PRODUCT_QUERY_PARAMS.page)) || 0;

  const isInitialPage = page === 0;
  if (isInitialPage) {
    params.set(PRODUCT_QUERY_PARAMS.pageSize, INITIAL_PAGE_SIZE);
  } else {
    params.set(PRODUCT_QUERY_PARAMS.page, page + PAGE_ADJUSTMENT);
    params.set(PRODUCT_QUERY_PARAMS.pageSize, PAGE_SIZE);
  }

  // 전체 카테고리는 쿼리 파라미터를 넣지 않는 것으로 처리
  if (params.get(PRODUCT_QUERY_PARAMS.category) === CATEGORY_OPTIONS.all) {
    params.delete(PRODUCT_QUERY_PARAMS.category);
  }

  return params;
};
