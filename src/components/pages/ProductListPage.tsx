import Header from "../Header/Header";
import ErrorToast from "../Toast/ErrorToast";
import { AppProvider } from "../Context/AppProvider";
import ProductContent from "../Product/ProductContent";
import S from "./ProductListPage.module.css";

const ProductListPage = () => {
	return (
		<AppProvider>
			<div className={S.container}>
				<Header />
				<ErrorToast />
				<ProductContent />
			</div>
		</AppProvider>
	);
};

export default ProductListPage;
