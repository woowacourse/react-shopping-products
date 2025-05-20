import ItemCardFilterSort from "../ItemCard/ItemCardFilterSort";
import S from "./ProductPageHeader.module.css";

const ProductPageHeader = () => (
	<div className={S.contentTop}>
		<h1 className={S.title}>bpple 상품 목록</h1>
		<ItemCardFilterSort />
	</div>
);

export default ProductPageHeader;
