import { useCartContext } from "../Context/CartProvider";
import { useProductContext } from "../Context/ProductProvider";
import S from "./ErrorToast.module.css";

const ErrorToast = () => {
	const { cartError } = useCartContext();
	const { productError } = useProductContext();

	return (
		(cartError || productError) && (
			<div className={S.toastContainer}>
				<p className={S.toastText}>{cartError || productError}</p>
			</div>
		)
	);
};

export default ErrorToast;
