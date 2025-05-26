import { useCartState, useProductState } from "../Context/StoreContext";
import S from "./ErrorToast.module.css";

const ErrorToast = () => {
	const { productError } = useProductState();
	const { cartError } = useCartState();
	return (
		(cartError || productError) && (
			<div className={S.toastContainer}>
				<p className={S.toastText}>{cartError || productError}</p>
			</div>
		)
	);
};

export default ErrorToast;
