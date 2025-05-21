import styled from "@emotion/styled";

export const Container = styled.div`
  width: 182px;
  height: 224px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Image = styled.img`
  width: 100%;
  height: 112px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 27px;
  padding: 8px;
`;

export const Contents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ProductTitle = styled.p`
  font-weight: 700;
  font-size: 14px;
`;

export const ProductPrice = styled.p`
  font-weight: 500;
  font-size: 12px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;
