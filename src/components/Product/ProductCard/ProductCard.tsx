import CartButton from "../../CartButton/CartButton";
import * as styles from "./ProductCard.style";
interface ProductCardProps {
  title: string;
  price: number;
  imageUrl: string;
  refetchCart: () => Promise<void>;
  isItemInCart: boolean;
  productId: number;
  cartItemId?: number;
}
// imageUrl이 null이면, 대체 이미지를 띄웁시다!
// onLoad라는 프로퍼티가 있는데.. 이것을 어떻게 하면..
// 이미지가 로드될때, spinnner를 띄울수 있을지도?

function ProductCard({
  title,
  price,
  imageUrl,
  isItemInCart,
  refetchCart,
  productId,
  cartItemId,
}: ProductCardProps) {
  return (
    <li css={styles.cardCss}>
      <img
        css={styles.imageCss}
        src={imageUrl}
        alt={`${title}상품`}
        onLoad={() => console.log("로드 되었슈!")}
      />
      <div css={styles.detailCss}>
        <h2>{title}</h2>
        <p>{`${price.toLocaleString()}원`}</p>
        <CartButton
          productId={productId}
          refetchCart={refetchCart}
          isInCart={isItemInCart}
          cartItemId={cartItemId}
        />
      </div>
    </li>
  );
}

export default ProductCard;
