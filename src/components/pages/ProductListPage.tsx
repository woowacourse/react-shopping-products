import Header from "../Header/Header";
import ItemCard from "../ItemCard/ItemCard";
import Skeleton from "../Skeleton/Skeleton";
import S from "./ProductListPage.module.css";
import ItemCardFilterSort from "../ItemCard/ItemCardFilterSort";
import ErrorToast from "../Toast/ErrorToast";
import { useAppContext } from "../Context/AppProvider";

const ProductListPage = () => {
	const { products, cartProducts, loading } = useAppContext();

	const mergedData = products.map((product) => {
		const cart = cartProducts.find((item) => item.product.id === product.id);
		return {
			...product,
			cartInfo: cart ? { id: cart.id, quantity: cart.quantity } : null,
		};
	});

	return (
		<div className={S.container}>
			<Header />
			<ErrorToast />

			<div className={S.contentContainer}>
				<div className={S.contentTop}>
					<h1 className={S.title}>bpple 상품 목록</h1>
					<ItemCardFilterSort />
				</div>

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
		</div>
	);
};

export default ProductListPage;
