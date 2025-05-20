import CartButton from "../Button/CartButton";
import { useAppContext } from "../Context/AppProvider";
import S from "./Header.module.css";

const Header = () => {
	const { cartProducts } = useAppContext();

	const cartCount = cartProducts.length;
	return (
		<div className={S.container}>
			<p>SHOP</p>
			<CartButton count={cartCount} />
		</div>
	);
};

export default Header;
