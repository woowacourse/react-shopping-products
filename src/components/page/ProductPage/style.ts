import styled from '@emotion/styled';

export const Wrapper = styled.div`
  position: absolute;
  top: 64px;
  left: 50%;
  transform: translate(-50%, 0);

  display: flex;
  flex-direction: column;
  gap: 28px;

  width: ${({ theme }) => theme.size.applicationSize};
  min-height: calc(100vh - 64px);

  margin: 0 auto;
  padding: 36px 24px;
  overflow-y: scroll;

  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export const FilterContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
