import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 28px;

  width: ${({ theme }) => theme.size.applicationSize};
  margin: 64px auto 0 auto;
  padding: 36px 24px;
  overflow: hidden;

  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export const FilterContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
