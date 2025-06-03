import { useError } from "../Context/ErrorContext";
import S from "./ErrorToast.module.css";

const ErrorToast = () => {
	const { errors } = useError();
	const errorMessages = Object.values(errors);
	if (errorMessages.length === 0) return null;

	return (
		<div className={S.toastContainer}>
			{errorMessages.map((message, index) => (
				<div key={index} className={S.toast}>
					{message}
				</div>
			))}
		</div>
	);
};

export default ErrorToast;
