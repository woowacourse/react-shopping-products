import { filterType, sortingType } from "../../types";
import { useAppContext } from "../Context/AppProvider";
import S from "./ItemCardFilterSort.module.css";

const ItemCardFilterSort = () => {
	const { filter, sort, setFilter, setSort } = useAppContext();

	return (
		<div className={S.dropdownContainer}>
			<select value={filter} onChange={(e) => setFilter(e.target.value as filterType)}>
				<option value="">전체</option>
				<option value="식료품">식료품</option>
				<option value="패션잡화">패션잡화</option>
			</select>
			<select value={sort} onChange={(e) => setSort(e.target.value as sortingType)}>
				<option value="asc">낮은 가격순</option>
				<option value="desc">높은 가격순</option>
			</select>
		</div>
	);
};

export default ItemCardFilterSort;
