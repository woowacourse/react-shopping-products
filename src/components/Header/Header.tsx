import { useStoreContext } from "../Context/StoreContext";
import HeaderCart from "../Button/HeaderCart";
import S from "./Header.module.css";

const Header = ({ setIsOpen }: { setIsOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
	const { cartProducts } = useStoreContext();
	const cartCount = cartProducts.length;

	return (
		<div className={S.container}>
			<p>SHOP</p>
			<HeaderCart count={cartCount} setIsOpen={setIsOpen} />
		</div>
	);
};

export default Header;
