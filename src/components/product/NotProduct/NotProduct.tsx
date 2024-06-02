import NotResultImage from '@assets/images/noResultImage.png';

import * as Styled from './NotProduct.styled';

const NotProduct = () => {
  return (
    <Styled.NotProductContainer>
      <Styled.NotProductImage src={NotResultImage} alt="상품이 없을 때의 이미지" />
      <Styled.NotProductText>상품이 존재하지 않습니다.</Styled.NotProductText>
    </Styled.NotProductContainer>
  );
};

export default NotProduct;
