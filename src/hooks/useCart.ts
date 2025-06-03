import { CART_URL } from "../constants/endpoint";
import { CartProduct } from "../types";
import { useData } from "../components/Context/DataContext";
import { useError } from "../components/Context/ErrorContext";
import addCart from "../utils/api/addCart";
import removeCart from "../utils/api/removeCart";
import updateCartItemCount from "../utils/api/updateCart";
import fetchData from "../utils/api/fetchData";

export const useCart = () => {
	const { data: cartItems, refetch } = useData<CartProduct[]>({
		fetcher: () => fetchData({ url: CART_URL }),
		name: "cartItems",
	});
	const { setError, clearError } = useError();

	const handleAddToCart = async (productId: number) => {
		try {
			clearError("addCart");
			await addCart(productId);
			refetch();
		} catch (error) {
			if (error instanceof Error) {
				setError("addCart", error.message);
			}
		}
	};

	const handleRemoveFromCart = async (productId: number) => {
		try {
			clearError("removeCart");
			await removeCart(productId);
			refetch();
		} catch (error) {
			if (error instanceof Error) {
				setError("removeCart", error.message);
			}
		}
	};

	const handleUpdateQuantity = async (productId: number, quantity: number) => {
		try {
			clearError("updateCart");
			await updateCartItemCount(productId, quantity);
			refetch();
		} catch (error) {
			if (error instanceof Error) {
				setError("updateCart", error.message);
			}
		}
	};

	return {
		cartItems: cartItems || [],
		handleAddToCart,
		handleRemoveFromCart,
		handleUpdateQuantity,
	};
};
