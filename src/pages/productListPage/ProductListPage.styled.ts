import styled from '@emotion/styled';

export const PageContainer = styled.section`
  width: 26.875rem;
  min-height: 100vh;
  position: relative;

  background-color: ${(props) => props.theme.color.white};
`;

export const CommonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  padding: 6rem 1.5rem 3rem 1.5rem;
`;

export const DropdownContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 80px;
`;
