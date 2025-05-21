import HeaderCart from "../Image/HeaderCart";
import { useCartContext } from "../Context/CartProvider";
import S from "./Header.module.css";

const Header = () => {
	const { cartProducts } = useCartContext();
	const cartCount = cartProducts.length;

	return (
		<div className={S.container}>
			<p>SHOP</p>
			<HeaderCart count={cartCount} />
		</div>
	);
};

export default Header;
