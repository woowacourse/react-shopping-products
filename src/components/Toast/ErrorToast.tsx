import { useStoreContext } from "../Context/StoreContext";
import S from "./ErrorToast.module.css";

const ErrorToast = () => {
	const { productError, cartError } = useStoreContext();
	return (
		(cartError || productError) && (
			<div className={S.toastContainer}>
				<p className={S.toastText}>{cartError || productError}</p>
			</div>
		)
	);
};

export default ErrorToast;
