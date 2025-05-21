import S from "./ItemCard.module.css";

interface ItemCardInfoProps {
	name: string;
	price: number;
}

const ItemCardInfo = ({ name, price }: ItemCardInfoProps) => {
	return (
		<div className={S.itemDescription}>
			<p className={S.cardName}>{name}</p>
			<p>{price.toLocaleString()}원</p>
		</div>
	);
};

export default ItemCardInfo;
