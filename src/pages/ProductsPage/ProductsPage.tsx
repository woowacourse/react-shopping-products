import { css } from '@emotion/css';
import Header from '../../components/Header/Header';
import SelectBox from '../../components/SelectBox/SelectBox';
import Toast from '../../components/Toast/Toast';

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
