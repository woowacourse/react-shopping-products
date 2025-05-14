import Header from "../Header/Header";
import ItemCard from "../ItemCard/ItemCard";
import S from "./Product.module.css";

const Product = () => {
	return (
		<div className={S.container}>
			<Header />
			<div className={S.contentContainer}>
				<div className={S.contentTop}>
					<h1 className={S.title}>bpple 상품 목록</h1>
					<div className={S.dropdownContainer}>
						<select>
							<option>전체</option>
						</select>
						<select>
							<option>낮은 가격순</option>
						</select>
					</div>
				</div>
				<ItemCard isCart={false} />
			</div>
		</div>
	);
};

export default Product;
