import styled from "styled-components";

export const ProductItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 182px;
  height: 224px;
  gap: 16px;
`;

export const ProductImage = styled.img`
  width: 182px;
  height: 112px;
  border-radius: 16px 16px 0 0;

  object-fit: cover;
  background-color: grey;
`;
