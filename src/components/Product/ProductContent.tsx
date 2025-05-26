import ItemCard from "../ItemCard/ItemCard";
import ItemCardFilterSort from "../ItemCard/ItemCardFilterSort";
import S from "./ProductContent.module.css";
import SkeletonList from "../Skeleton/SkeletonList";
import SkeletonCard from "../Skeleton/SkeletonCard";
import { MergedProduct } from "../../types";
import { useMergedProducts, useProductState } from "../Context/StoreContext";

const ProductContent = () => {
	const { loading } = useProductState();
	const mergedProducts = useMergedProducts();

	return (
		<div className={S.contentContainer}>
			<div className={S.contentTop}>
				<h1 className={S.title}>bpple 상품 목록</h1>
				<ItemCardFilterSort />
			</div>
			{loading ? (
				<div className={S.itemContainer}>
					<SkeletonList count={10} renderItem={(i) => <SkeletonCard key={i} />} />
				</div>
			) : (
				<div className={S.itemContainer}>
					{mergedProducts.map((mergedProduct: MergedProduct) => (
						<ItemCard key={mergedProduct.id} mergedProduct={mergedProduct} />
					))}
				</div>
			)}
		</div>
	);
};

export default ProductContent;
