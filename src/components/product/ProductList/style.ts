import styled from '@emotion/styled';

export const Grid = styled.div<{ isEmpty: boolean }>`
  position: relative;
  height: 100%;

  display: grid;
  gap: 20px 16px;
  grid-template-columns: ${(props) => (props.isEmpty ? 'auto' : 'auto auto')};
`;

export const LoadingContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const EmptyProducts = styled.p`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
