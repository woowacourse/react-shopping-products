import React, { createContext, useContext, useState } from "react";
import { CartProduct, filterType, Product, sortingType } from "../../types";
import useCart from "../../hooks/useCart";
import useProducts from "../../hooks/useProducts";

type AppContextType = {
	cartProducts: CartProduct[];
	products: Product[];
	loading: boolean;
	cartError: string;
	productError: string;
	filter: filterType;
	setFilter: React.Dispatch<React.SetStateAction<filterType>>;
	sort: sortingType;
	setSort: React.Dispatch<React.SetStateAction<sortingType>>;
	refetchCartItems: () => Promise<void>;
	refetchProductItems: () => Promise<void>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
	const [filter, setFilter] = useState<filterType>("");
	const [sort, setSort] = useState<sortingType>("asc");
	const { cartProducts, fetchCartProducts, cartError } = useCart();
	const { products, fetchProducts, loading, productError } = useProducts({ filterType: filter, sortingType: sort });

	return (
		<AppContext.Provider
			value={{
				cartProducts,
				products,
				loading,
				cartError,
				filter,
				setFilter,
				sort,
				setSort,
				productError,
				refetchCartItems: fetchCartProducts,
				refetchProductItems: fetchProducts,
			}}
		>
			{children}
		</AppContext.Provider>
	);
}

export function useAppContext() {
	const context = useContext(AppContext);
	if (context === undefined) {
		throw new Error("useAppContext must be used within an AppProvider");
	}
	return context;
}
