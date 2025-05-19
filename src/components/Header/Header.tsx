import { CartProduct } from "../../types";
import CartButton from "../Button/CartButton";
import S from "./Header.module.css";

interface HeaderProps {
	cardProducts: CartProduct[];
}

const Header = ({ cardProducts }: HeaderProps) => {
	const cartCount = cardProducts.length;
	return (
		<div className={S.container}>
			<p>SHOP</p>
			<CartButton count={cartCount} />
		</div>
	);
};

export default Header;
