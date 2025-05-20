import ProductPageHeader from "./ProductPageHeader";
import ItemCard from "../ItemCard/ItemCard";
import Skeleton from "../Skeleton/Skeleton";
import mergeProducts from "../../utils/mergeProducts";
import { useAppContext } from "../Context/AppProvider";
import S from "./ProductContent.module.css";

const ProductContent = () => {
	const { products, cartProducts, loading } = useAppContext();
	const mergedData = mergeProducts(products, cartProducts);

	return (
		<div className={S.contentContainer}>
			<ProductPageHeader />
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
