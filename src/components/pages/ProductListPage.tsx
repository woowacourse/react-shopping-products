import CartHeader from "../Header/CartHeader";
import ErrorToast from "../Toast/ErrorToast";
import ProductContent from "../Product/ProductContent";
import S from "./ProductListPage.module.css";
import { useState } from "react";
import CartModal from "../Modal/CartModal";
import { DataProvider } from "../Context/DataContext";
import { ErrorProvider } from "../Context/ErrorContext";

const ProductListPage = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const openModal = () => {
		setIsOpen(true);
	};

	const closeModal = () => {
		setIsOpen(false);
	};

	return (
		<DataProvider>
			<ErrorProvider>
				<div className={S.container}>
					<CartHeader onClick={openModal} />
					<ErrorToast />
					<ProductContent />
					<CartModal isOpen={isOpen} onClick={closeModal} />
				</div>
			</ErrorProvider>
		</DataProvider>
	);
};

export default ProductListPage;
