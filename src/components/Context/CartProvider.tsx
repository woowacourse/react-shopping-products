import { createContext, useContext } from "react";
import useCart from "../../hooks/useCart";
import { CartProduct } from "../../types";

interface CartContextType {
	cartProducts: CartProduct[];
	cartError: string;
	updateCartItem: (type: string, id: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
	const { cartProducts, cartError, updateCartItem } = useCart();

	return (
		<CartContext.Provider
			value={{
				cartProducts,
				cartError,
				updateCartItem,
			}}
		>
			{children}
		</CartContext.Provider>
	);
}

export function useCartContext() {
	const context = useContext(CartContext);
	if (context === undefined) {
		throw new Error("useCartContext는 CartProvider 내부에서만 사용해야 합니다");
	}
	return context;
}
