import { useAppContext } from "../Context/AppProvider";
import S from "./ErrorToast.module.css";

const ErrorToast = () => {
	const { cartError, productError } = useAppContext();

	return (
		(cartError || productError) && (
			<div className={S.toastContainer}>
				<p className={S.toastText}>{cartError || productError}</p>
			</div>
		)
	);
};

export default ErrorToast;
