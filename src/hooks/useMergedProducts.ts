import { useMemo } from "react";
import mergeProducts from "../utils/mergeProducts";
import { useCart } from "./useCart";
import { useProducts } from "./useProducts";
import { FilterType, SortType } from "../types";

export const useMergedProducts = ({ filter, sort }: { filter: FilterType; sort: SortType }) => {
	const { cartItems } = useCart();
	const { products, loading } = useProducts({ filter, sort });
	const mergedProducts = useMemo(() => mergeProducts(products, cartItems), [products, cartItems]);

	return { mergedProducts, loading };
};
