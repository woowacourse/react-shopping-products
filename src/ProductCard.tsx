import styled from '@emotion/styled';

function ProductCard() {
  return (
    <Container>
      <PreviewBox>
        <PreviewImage src="https://img.hankyung.com/photo/202208/99.30841131.1.jpg" />
      </PreviewBox>
      <InfoBox>상품 이름</InfoBox>
    </Container>
  );
}

const Container = styled.div`
  background-color: white;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: hidden;
`;

const PreviewBox = styled.div`
  width: 100%;
  height: 112px;
`;

const PreviewImage = styled.img`
  object-fit: cover;
`;

const InfoBox = styled.div`
  width: 100%;
  padding: 0px;
`;

export default ProductCard;
