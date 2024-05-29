import styled from "styled-components";

export const ProductItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
`;

export const ProductImage = styled.img`
  width: 100%;
  aspect-ratio: 16/9;
  border-radius: 16px 16px 0 0;
  object-fit: cover;
  background-color: grey;
`;

export const ProductDescription = styled.div`
  display:flex;
  flex-direction:column;
  gap: 24px;
  padding: 16px 8px 8px 8px;
`

export const ToggleCartItemButtonWrapper = styled.div`
display:flex;
width: 100%;
flex-direction: row-reverse;
`