import { Product } from '../../types/Product.type';
import AddCart from '../../assets/AddCart.svg';
import MinusIcon from '../../assets/MinusIcon.svg';
import PlusIcon from '../../assets/PlusIcon.svg';
import Button from '../Button/Button';
import * as S from './ProductItem.style';
import { CartItem } from '../../types/CartItem.type';

interface ProductItemProps {
  product: Product;
  cartItems: CartItem[];
  onAddCartItem: (productId: number) => void;
  onDeleteCartItem: (cartItemId: number) => void;
  onUpdateQuantity: (cartItemId: number, quantity: number) => void;
}

const ProductItem = ({ product, cartItems, onAddCartItem, onDeleteCartItem, onUpdateQuantity }: ProductItemProps) => {
  const cartItem = cartItems.find((item) => item.product.id === product.id);
  const isAdded = !!cartItem;

  const handleDecreaseQuantity = () => {
    if (!cartItem) return;
    if (cartItem.quantity === 1) {
      onDeleteCartItem(cartItem.id);
    } else {
      onUpdateQuantity(cartItem.id, cartItem.quantity - 1);
    }
  };

  const handleIncreaseQuantity = () => {
    if (!cartItem) return;
    onUpdateQuantity(cartItem.id, cartItem.quantity + 1);
  };

  return (
    <S.Layout>
      <S.ImageWrapper src={product.imageUrl} alt={product.name} />
      <S.Container>
        <S.TextContainer>
          <strong>{product.name}</strong>
          <p>상품 설명</p>
          <p>{product.price}원</p>
        </S.TextContainer>
        <S.CartButtonContainer>
          {isAdded ? (
            <S.CartItemQuantityControls>
              <Button variant="secondary" size="small" onClick={handleDecreaseQuantity}>
                <img src={MinusIcon} alt="장바구니 1개 제거" />
              </Button>
              <p>{cartItem.quantity}</p>
              <Button variant="secondary" size="small" onClick={handleIncreaseQuantity}>
                <img src={PlusIcon} alt="장바구니 1개 추가" />
              </Button>
            </S.CartItemQuantityControls>
          ) : (
            <Button size="medium" onClick={() => onAddCartItem(product.id)}>
              <S.AddCartIcon src={AddCart} alt="장바구니 담기" />
              <p>담기</p>
            </Button>
          )}
        </S.CartButtonContainer>
      </S.Container>
    </S.Layout>
  );
};

export default ProductItem;
