import { css } from '@emotion/css';
import SelectBox from '../../components/common/SelectBox/SelectBox';
import Toast from '../../components/common/Toast/Toast';
import Header from '../../components/Header/Header';

const productPageContainer = css`
  width: 429px;
  margin: 0 auto;
`;

function ProductsPage() {
  return (
    <div className={productPageContainer}>
      <Header />
      <SelectBox placeHolder="전체" options={['1', '2', '3']} />
      <Toast text="안녕하세요" varient="error" />
    </div>
  );
}

export default ProductsPage;
