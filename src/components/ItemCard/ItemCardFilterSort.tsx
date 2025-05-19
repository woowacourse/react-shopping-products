import S from "../Pages/Product.module.css";

interface Props {
	filter: string;
	sort: string;
	setFilter: (value: string) => void;
	setSort: (value: string) => void;
}

const ItemCardFilterSort = ({ filter, sort, setFilter, setSort }: Props) => (
	<div className={S.dropdownContainer}>
		<select value={filter} onChange={(e) => setFilter(e.target.value)}>
			<option value="">전체</option>
			<option value="식료품">식료품</option>
			<option value="패션잡화">패션잡화</option>
		</select>
		<select value={sort} onChange={(e) => setSort(e.target.value)}>
			<option value="asc">낮은 가격순</option>
			<option value="desc">높은 가격순</option>
		</select>
	</div>
);

export default ItemCardFilterSort;
