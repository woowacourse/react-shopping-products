import { useMemo } from "react";
import mergeProducts from "../utils/mergeProducts";
import { useCart } from "./useCart";
import { useProducts } from "./useProducts";

export const useMergedProducts = () => {
	const { cartItems } = useCart();
	const { products, loading } = useProducts();
	const mergedProducts = useMemo(() => mergeProducts(products, cartItems), [products, cartItems]);

	return { mergedProducts, loading };
};
