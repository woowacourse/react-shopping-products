import S from "./ItemCard.module.css";

interface CardInfoProps {
	name: string;
	price: number;
}

const CardInfo = ({ name, price }: CardInfoProps) => {
	return (
		<div className={S.itemDescription}>
			<p className={S.cardName}>{name}</p>
			<p>{price.toLocaleString()}원</p>
		</div>
	);
};

export default CardInfo;
