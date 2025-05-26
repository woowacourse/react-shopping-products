import { createContext, useContext, useMemo } from "react";
import useCart from "../../hooks/useCart";
import useProducts from "../../hooks/useProducts";
import mergeProducts from "../../utils/mergeProducts";
import { CartProduct, FilterType, MergedProduct, SortType } from "../../types";

interface ProductContextType {
	mergedProducts: MergedProduct[];
	cartProducts: CartProduct[];
	productError: string;
	cartError: string;
	loading: boolean;
	filter: FilterType;
	sort: SortType;
	setFilter: React.Dispatch<React.SetStateAction<FilterType>>;
	setSort: React.Dispatch<React.SetStateAction<SortType>>;
	updateCartItem: (type: string, id: number, quantity?: number) => void;
}

const StoreContext = createContext<ProductContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
	const { products, loading, productError, sort, filter, setSort, setFilter } = useProducts();
	const { cartProducts, updateCartItem, cartError } = useCart();
	const mergedData = useMemo(() => mergeProducts(products, cartProducts), [products, cartProducts]);

	return (
		<StoreContext.Provider value={{ mergedProducts: mergedData, cartProducts, loading, updateCartItem, productError, cartError, filter, sort, setFilter, setSort }}>{children}</StoreContext.Provider>
	);
}

export function useStoreContext() {
	const context = useContext(StoreContext);
	if (context === undefined) {
		throw new Error("useStoreContext는 StoreProvider 내부에서만 사용해야 합니다");
	}
	return context;
}
