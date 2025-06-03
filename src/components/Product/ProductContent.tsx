import ItemCard from "../ItemCard/ItemCard";
import ItemCardFilterSort from "../ItemCard/ItemCardFilterSort";
import S from "./ProductContent.module.css";
import SkeletonList from "../Skeleton/SkeletonList";
import SkeletonCard from "../Skeleton/SkeletonCard";
import { FilterType, MergedProduct, SortType } from "../../types";
import { useMergedProducts } from "../../hooks/useMergedProducts";
import { useState } from "react";

const ProductContent = () => {
	const [filter, setFilter] = useState<FilterType>("");
	const [sort, setSort] = useState<SortType>("asc");
	const { mergedProducts, loading } = useMergedProducts({ filter, sort });

	const selectFilter = (filter: FilterType) => {
		setFilter(filter);
	};
	const selectSort = (sort: SortType) => {
		setSort(sort);
	};

	return (
		<div className={S.contentContainer}>
			<div className={S.contentTop}>
				<h1 className={S.title}>bpple 상품 목록</h1>
				<ItemCardFilterSort filter={filter} selectFilter={selectFilter} sort={sort} selectSort={selectSort} />
			</div>
			{loading ? (
				<div className={S.itemContainer}>
					<SkeletonList count={10} renderItem={(i) => <SkeletonCard key={i} />} />
				</div>
			) : (
				<div className={S.itemContainer}>
					{mergedProducts.map((mergedProduct: MergedProduct) => (
						<ItemCard key={mergedProduct.product.id} mergedProduct={mergedProduct} />
					))}
				</div>
			)}
		</div>
	);
};

export default ProductContent;
