import styled from '@emotion/styled';

export const ItemCardSection = styled.section`
  width: 18.2rem;
  height: 22.4rem;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 8px;

  h3 {
    font-size: 1.4rem;
    font-weight: 700;
  }

  p {
    font-size: 1.2rem;
    font-weight: 500;
  }
`;

export const ItemImage = styled.img`
  border-radius: 8px 8px 0 0;
  width: 100%;
  height: 11.4rem;
  object-fit: cover;
`;

export const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ButtonImg = styled.img`
  width: 1.6rem;
  height: 1.6rem;
`;

export const ItemCardBottom = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;
