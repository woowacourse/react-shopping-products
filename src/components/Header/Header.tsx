import CartButton from "../Button/CartButton";
import { useCartContext } from "../Context/CartProvider";
import S from "./Header.module.css";

const Header = () => {
	const { cartProducts } = useCartContext();
	const cartCount = cartProducts.length;

	return (
		<div className={S.container}>
			<p>SHOP</p>
			<CartButton count={cartCount} />
		</div>
	);
};

export default Header;
