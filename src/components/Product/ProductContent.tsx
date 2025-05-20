import ItemCard from "../ItemCard/ItemCard";
import Skeleton from "../Skeleton/Skeleton";
import mergeProducts from "../../utils/mergeProducts";
import ItemCardFilterSort from "../ItemCard/ItemCardFilterSort";
import { useCartContext } from "../Context/CartProvider";
import { useProductContext } from "../Context/ProductProvider";
import S from "./ProductContent.module.css";

const ProductContent = () => {
	const { products, loading } = useProductContext();
	const { cartProducts } = useCartContext();
	const mergedData = mergeProducts(products, cartProducts);

	return (
		<div className={S.contentContainer}>
			<div className={S.contentTop}>
				<h1 className={S.title}>bpple 상품 목록</h1>
				<ItemCardFilterSort />
			</div>
			{loading ? (
				<Skeleton length={10} />
			) : (
				<div className={S.itemContainer}>
					{mergedData.map(({ id, imageUrl, name, price, cartInfo }) => (
						<ItemCard key={id} id={id} imageUrl={imageUrl} name={name} price={price} cartInfo={cartInfo} />
					))}
				</div>
			)}
		</div>
	);
};

export default ProductContent;
