import Header from '../../components/Header/Header';
import { css } from '@emotion/css';

const productPageContainer = css`
  width: 429px;
  margin: 0 auto;
`;

function ProductsPage() {
  return (
    <div className={productPageContainer}>
      <Header />
    </div>
  );
}

export default ProductsPage;
