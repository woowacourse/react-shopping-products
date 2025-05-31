// src/components/Header/Header.tsx
import { useCartState } from "../Context/StoreContext";
import HeaderCart from "../Button/HeaderCart";
import S from "./Header.module.css";

interface HeaderProps {
	onClick: () => void;
}

const Header = ({ onClick }: HeaderProps) => {
	const { cartProducts } = useCartState();
	const cartCount = cartProducts.length;

	return (
		<div className={S.container}>
			<p>SHOP</p>
			<HeaderCart count={cartCount} onClick={onClick} />
		</div>
	);
};

export default Header;
