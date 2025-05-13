import S from "./ErrorToast.module.css";

const ErrorToast = ({ isError }: { isError: boolean }) => {
	return (
		isError && (
			<div className={S.toastContainer}>
				<p className={S.toastText}>오류가 발생했습니다. 잠시 후 다시 시도해 주세요.</p>
			</div>
		)
	);
};

export default ErrorToast;
