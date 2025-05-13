import { css } from '@emotion/css';
import Header from '../../components/Header/Header';
import SelectBox from '../../components/SelectBox/SelectBox';

const productPageContainer = css`
  width: 429px;
  margin: 0 auto;
`;

function ProductsPage() {
  return (
    <div className={productPageContainer}>
      <Header />
      <SelectBox placeHolder="전체" options={['1', '2', '3']} />
    </div>
  );
}

export default ProductsPage;
