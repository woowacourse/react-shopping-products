// src/components/Context/StoreContext.tsx
import { createContext, useContext } from "react";
import useCart from "../../hooks/useCart";
import useProducts from "../../hooks/useProducts";
import { CartProduct, FilterType, Product, SortType } from "../../types";

interface ProductState {
	products: Product[];
	loading: boolean;
	productError: string;
	filter: FilterType;
	sort: SortType;
	setFilter: React.Dispatch<React.SetStateAction<FilterType>>;
	setSort: React.Dispatch<React.SetStateAction<SortType>>;
}

interface CartState {
	cartProducts: CartProduct[];
	cartError: string;
	updateCartItem: (type: string, id: number, quantity?: number) => void;
}

interface StoreContextType {
	product: ProductState;
	cart: CartState;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
	const productState = useProducts();
	const cartState = useCart();

	const value = {
		product: {
			products: productState.products,
			loading: productState.loading,
			productError: productState.productError,
			filter: productState.filter,
			sort: productState.sort,
			setFilter: productState.setFilter,
			setSort: productState.setSort,
		},
		cart: {
			cartProducts: cartState.cartProducts,
			cartError: cartState.cartError,
			updateCartItem: cartState.updateCartItem,
		},
	};

	return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useProductState() {
	const context = useContext(StoreContext);
	if (!context) throw new Error("useProductState는 StoreProvider 내부에서만 사용해야 합니다");
	return context.product;
}

export function useCartState() {
	const context = useContext(StoreContext);
	if (!context) throw new Error("useCartState는 StoreProvider 내부에서만 사용해야 합니다");
	return context.cart;
}
