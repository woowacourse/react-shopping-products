import { useInfiniteQuery } from '@tanstack/react-query';
import { productApis } from '../../api/product';
import {
  INITIAL_PAGE_NUMBER,
  INITIAL_PAGE_SIZE,
  PAGE_SIZE,
} from '../../constants/paginationRules';
import { QUERY_KEYS } from '../../constants/queryKeys';

export const productQueries = {
  useGetProducts: (params: { sort: string[]; category: string }) => {
    const { sort, category } = params;

    return useInfiniteQuery({
      queryKey: [QUERY_KEYS.getProducts, sort, category],
      initialPageParam: INITIAL_PAGE_NUMBER,
      initialData: { pages: [{ last: false, content: [] }], pageParams: [] },

      queryFn: async ({ pageParam = INITIAL_PAGE_NUMBER }) =>
        await productApis.get({
          page: pageParam as number,
          size:
            pageParam === INITIAL_PAGE_NUMBER ? INITIAL_PAGE_SIZE : PAGE_SIZE,
          ...params,
        }),

      getNextPageParam: (lastPage, allPages) => {
        const secondPage = INITIAL_PAGE_SIZE / PAGE_SIZE;
        const nextPage =
          allPages.length === 1
            ? secondPage
            : secondPage + (allPages.length - 1);

        return lastPage.last ? undefined : nextPage;
      },

      select: ({ pages, pageParams }) => ({
        // 서버에 의미 없는 제품 정보가 들어가 있어 filter 후 컴포넌트 생성 (2024.06.09, 렛서)
        pages: pages
          .flatMap((page) => page.content)
          .filter((product) => product.name !== 'string'),
        pageParams: pageParams,
      }),
    });
  },
};
