// src/hooks/useMergedProducts.ts
import { useMemo } from "react";
import { useProductState } from "../components/Context/StoreContext";
import { useCartState } from "../components/Context/StoreContext";
import mergeProducts from "../utils/mergeProducts";

export function useMergedProducts() {
	const { products } = useProductState();
	const { cartProducts } = useCartState();

	const mergedProducts = useMemo(() => mergeProducts(products, cartProducts), [products, cartProducts]);

	return mergedProducts;
}
