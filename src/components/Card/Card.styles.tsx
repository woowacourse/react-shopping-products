import styled from "@emotion/styled";

export const CardWrapper = styled.div`
  max-width: 166px;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
`;

export const CardPreview = styled.div`
  max-height: 112px;
  overflow: hidden;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const CardContent = styled.div`
  padding: 15px 8px 8px;
`;
