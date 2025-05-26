import Header from "../Header/Header";
import ErrorToast from "../Toast/ErrorToast";
import ProductContent from "../Product/ProductContent";
import S from "./ProductListPage.module.css";
import { useState } from "react";
import CartModal from "../Modal/CartModal";
import { StoreProvider } from "../Context/StoreContext";

const ProductListPage = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	return (
		<StoreProvider>
			<div className={S.container}>
				<Header setIsOpen={setIsOpen} />
				<ErrorToast />
				<ProductContent />
				<CartModal isOpen={isOpen} setIsOpen={setIsOpen} />
			</div>
		</StoreProvider>
	);
};

export default ProductListPage;
