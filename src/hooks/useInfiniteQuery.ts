// import { useInfiniteQuery } from '@tanstack/react-query';
// import { fetchProducts } from '../api/products';
// import { usePagination } from './usePagination';
// import { SortingParam } from '../types/sort';
// import { DEFAULT_SORTING_PARAM } from '../constants/page';

// export const useInfiniteScroll = (
//   sortings: SortingParam[] = [DEFAULT_SORTING_PARAM],
//   filter: string | '' = '',
// ) => {
//   const {
//     size,
//     fetchedPage,
//     // fetchNextPage,
//     resetPage,
//     isLast,
//     setIsLast,
//   } = usePagination();

//   const {
//     fetchNextPage,
//     fetchPreviousPage,
//     hasNextPage,
//     hasPreviousPage,
//     isFetchingNextPage,
//     isFetchingPreviousPage,
//     ...result
//   } = useInfiniteQuery({
//     queryKey: ['infiniteScroll'],
//     queryFn: ({ pageParam }: { pageParam: number }) =>
//       fetchProducts(pageParam, size, sortings, filter),
//     initialPageParam:0,
//     ...options,
//     getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) =>
//       lastPage.nextCursor,
//     getPreviousPageParam: (
//       firstPage,
//       allPages,
//       firstPageParam,
//       allPageParams,
//     ) => firstPage.prevCursor,
//   });

//   return {
//     fetchNextPage,
//     fetchPreviousPage,
//     hasNextPage,
//     hasPreviousPage,
//     isFetchingNextPage,
//     isFetchingPreviousPage,
//     ...result,
//   };
// };
