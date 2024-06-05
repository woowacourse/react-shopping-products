// import { useEffect } from "react";
// import useToast from "@/hooks/useToast";
// import { ERROR_MESSAGES } from "@/constants/messages";
// import useInfiniteFilteredProducts from "@/hooks/server/useInfiniteFilteredProducts";
// import { Category, Sort } from "@/constants/selectOption";

// const useProducts = ({ category, sort }: { category: Category; sort: Sort }) => {
//   const { fetchNextPage, data, isLoading, hasNextPage, isError } = useInfiniteFilteredProducts({
//     category,
//     sort,
//   });

//   const { onAddToast } = useToast();

//   useEffect(() => {
//     if (isError) {
//       onAddToast(ERROR_MESSAGES.failGetProducts);
//     }
//   }, [isError, onAddToast]);

//   return { products: data?.pages, isLoading, hasNextPage, fetchNextPage, isError };
// };

// export default useProducts;
