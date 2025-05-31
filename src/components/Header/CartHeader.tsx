import CartModalButton from "../Button/CartModalButton";
import S from "./CartHeader.module.css";

interface HeaderProps {
	onClick: () => void;
}

const CartHeader = ({ onClick }: HeaderProps) => {
	return (
		<div className={S.container}>
			<p>SHOP</p>
			<CartModalButton onClick={onClick} />
		</div>
	);
};

export default CartHeader;
