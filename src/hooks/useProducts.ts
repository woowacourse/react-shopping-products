import { useState, useEffect } from "react";
import { Product } from "../types";
import { PRODUCT_URL } from "../constants/endpoint";

interface UseProductsResult {
	products: Product[];
}

export default function useProducts(): UseProductsResult {
	const [products, setProducts] = useState<Product[]>([]);

	useEffect(() => {
		const fetchProducts = async () => {
			const response = await fetch(PRODUCT_URL);
			const data = await response.json();
			setProducts(data);
		};

		fetchProducts();
	}, []);

	return { products };
}
