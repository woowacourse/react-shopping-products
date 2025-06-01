import * as S from "./Header.styles";
import Logo from "/public/logo.svg";
import CartIcon from "/public/icon/cart.svg";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { countDistinct } from "../../util/countDistinct";
import useDataContext from "../../hooks/useDataContext";
import type { CartItemType } from "../../types/data";

interface HeaderProps {
	onCartModalOpen: () => void;
}

const Header = ({ onCartModalOpen }: HeaderProps) => {
	const navigate = useNavigate();
	const { cartItemsResource } = useDataContext();

	return (
		<S.HeaderContainer>
			<S.HeaderLogoButton onClick={() => navigate(ROUTES.PRODUCT_LIST_PAGE)}>
				<img src={Logo} alt="헤더 로고" />
			</S.HeaderLogoButton>
			<S.HeaderCartButton onClick={onCartModalOpen}>
				<img src={CartIcon} alt="장바구니" />
				{cartItemsResource.data?.length !== 0 && (
					<S.HeaderItemCount>
						{countDistinct(
							cartItemsResource.data?.map(
								(cartItem: CartItemType) => cartItem.product.id,
							) ?? [],
						)}
					</S.HeaderItemCount>
				)}
			</S.HeaderCartButton>
		</S.HeaderContainer>
	);
};

export default Header;
