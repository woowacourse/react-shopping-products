import { FILTER_OPTIONS, FilterType, SORT_OPTIONS, SortType } from "../../types";
import Select from "../Select/Select";
import S from "./ItemCardFilterSort.module.css";

interface ItemCardFilterSortProps {
	filter: FilterType;
	selectFilter: (filter: FilterType) => void;
	sort: SortType;
	selectSort: (sort: SortType) => void;
}

const ItemCardFilterSort = ({ filter, selectFilter, sort, selectSort }: ItemCardFilterSortProps) => {
	return (
		<div className={S.dropdownContainer}>
			<Select value={filter} options={FILTER_OPTIONS} onChange={(value) => selectFilter(value as FilterType)} />
			<Select value={sort} options={SORT_OPTIONS} onChange={(value) => selectSort(value as SortType)} />
		</div>
	);
};

export default ItemCardFilterSort;
