import S from "../ItemCard/ItemCard.module.css";

interface ButtonProps {
	onClick: () => void;
	icon: string;
	text: string;
	className: string;
}

const CartButton = ({ onClick, icon, text, className }: ButtonProps) => {
	return (
		<button className={className} onClick={onClick}>
			<img className={S.cartImg} src={icon} alt={text} />
			<p>{text}</p>
		</button>
	);
};

export default CartButton;
