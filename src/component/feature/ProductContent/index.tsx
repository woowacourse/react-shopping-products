import { CartItem, Product } from '../../../types/common';
import ProductCard from '../ProductCard';
import Button from '../../@common/Button';
import { emptyStateStyle, loadingStateStyle } from './ProductContent.styles';

interface ProductContentProps {
  isLoading: boolean;
  data: Product[];
  cartData: CartItem[];
  category: string;
  handleAddCart: (productId: number) => void;
  handleRemoveCart: (cartId: number) => void;
  handleCategoryClick: (category: string) => void;
}

const ProductContent = ({
  isLoading,
  data,
  cartData,
  category,
  handleAddCart,
  handleRemoveCart,
  handleCategoryClick,
}: ProductContentProps) => {
  if (isLoading) {
    return (
      <div css={loadingStateStyle}>
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div css={emptyStateStyle}>
        <svg
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>
        <h3>상품이 없습니다</h3>
        <p>선택한 카테고리에 상품이 없거나 필터링 결과가 없습니다.</p>
        {category !== '전체' && (
          <div style={{ marginTop: '16px' }}>
            <Button onClick={() => handleCategoryClick('전체')}>
              모든 상품 보기
            </Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      {data.map((product: Product) => {
        const isInCart = cartData.some(
          (item: CartItem) => item.product.id === product.id
        );
        return (
          <ProductCard
            key={product.id}
            {...product}
            isInCart={isInCart}
            handleAddCart={handleAddCart}
            handleRemoveCart={handleRemoveCart}
            cartData={cartData}
          />
        );
      })}
    </>
  );
};

export default ProductContent;
