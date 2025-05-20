import { filterType, sortingType } from "../../types";
import { useProductContext } from "../Context/ProductProvider";
import Select from "../Select/Select";
import S from "./ItemCardFilterSort.module.css";

const filterOptions = [
	{ value: "", label: "전체" },
	{ value: "식료품", label: "식료품" },
	{ value: "패션잡화", label: "패션잡화" },
];

const sortOptions = [
	{ value: "asc", label: "낮은 가격순" },
	{ value: "desc", label: "높은 가격순" },
];

const ItemCardFilterSort = () => {
	const { filter, sort, setFilter, setSort } = useProductContext();

	return (
		<div className={S.dropdownContainer}>
			<Select value={filter} options={filterOptions} onChange={(value) => setFilter(value as filterType)} />
			<Select value={sort} options={sortOptions} onChange={(value) => setSort(value as sortingType)} />
		</div>
	);
};

export default ItemCardFilterSort;
