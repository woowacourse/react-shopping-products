import styled from "@emotion/styled";

export const SkeletonContainer = styled.div`
  display: flex;
  width: 182px;
  height: 224px;
  flex-direction: column;
  border-radius: 8px;
`;

export const SkeletonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px 8px 8px;
  border-radius: 0 0 8px 8px;
  height: 50%;
  position: relative;
  border-top: none;
`;
