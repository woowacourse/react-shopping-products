// src/components/Header/Header.tsx
import { useCartState } from "../Context/StoreContext";
import CartModalButton from "../Button/CartModalButton";
import S from "./CartHeader.module.css";

interface HeaderProps {
	onClick: () => void;
}

const CartHeader = ({ onClick }: HeaderProps) => {
	const { cartProducts } = useCartState();
	const cartCount = cartProducts.length;

	return (
		<div className={S.container}>
			<p>SHOP</p>
			<CartModalButton count={cartCount} onClick={onClick} />
		</div>
	);
};

export default CartHeader;
