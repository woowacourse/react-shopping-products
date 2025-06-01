import { useProducts } from "../../hooks/useProducts";
import { FILTER_OPTIONS, FilterType, SORT_OPTIONS, SortType } from "../../types";
import Select from "../Select/Select";
import S from "./ItemCardFilterSort.module.css";

const ItemCardFilterSort = () => {
	const { filter, sort, setFilter, setSort } = useProducts();

	return (
		<div className={S.dropdownContainer}>
			<Select value={filter} options={FILTER_OPTIONS} onChange={(value) => setFilter(value as FilterType)} />
			<Select value={sort} options={SORT_OPTIONS} onChange={(value) => setSort(value as SortType)} />
		</div>
	);
};

export default ItemCardFilterSort;
