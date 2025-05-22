import Header from "../Header/Header";
import ErrorToast from "../Toast/ErrorToast";
import ProductContent from "../Product/ProductContent";
import { CartProvider } from "../Context/CartProvider";
import { ProductProvider } from "../Context/ProductProvider";
import S from "./ProductListPage.module.css";

const ProductListPage = () => {
	return (
		<CartProvider>
			<div className={S.container}>
				<Header />
				<ProductProvider>
					<ErrorToast />
					<ProductContent />
				</ProductProvider>
			</div>
		</CartProvider>
	);
};

export default ProductListPage;
