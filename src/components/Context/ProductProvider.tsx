import { createContext, useContext } from "react";
import useProducts from "../../hooks/useProducts";
import { filterType, Product, sortingType } from "../../types";

interface ProductContextType {
	products: Product[];
	loading: boolean;
	sort: sortingType;
	setSort: React.Dispatch<React.SetStateAction<sortingType>>;
	filter: filterType;
	setFilter: React.Dispatch<React.SetStateAction<filterType>>;
	productError: string;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode }) {
	const { products, loading, productError, sort, setSort, filter, setFilter } = useProducts();

	return (
		<ProductContext.Provider
			value={{
				products,
				loading,
				sort,
				setSort,
				filter,
				setFilter,
				productError,
			}}
		>
			{children}
		</ProductContext.Provider>
	);
}

export function useProductContext() {
	const context = useContext(ProductContext);
	if (context === undefined) {
		throw new Error("useProductContext는 ProductProvider 내부에서만 사용해야 합니다");
	}
	return context;
}
