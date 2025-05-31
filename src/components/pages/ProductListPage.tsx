import Header from "../Header/Header";
import ErrorToast from "../Toast/ErrorToast";
import ProductContent from "../Product/ProductContent";
import S from "./ProductListPage.module.css";
import { useState } from "react";
import CartModal from "../Modal/CartModal";
import { StoreProvider } from "../Context/StoreContext";

const ProductListPage = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const openModal = () => {
		setIsOpen(true);
	};

	return (
		<StoreProvider>
			<div className={S.container}>
				<Header onClick={openModal} />
				<ErrorToast />
				<ProductContent />
				<CartModal isOpen={isOpen} setIsOpen={setIsOpen} />
			</div>
		</StoreProvider>
	);
};

export default ProductListPage;
