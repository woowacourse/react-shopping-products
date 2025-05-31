import styled from '@emotion/styled';

const ModalButtonWrapper = ({ children }: { children: React.ReactNode }) => {
  return <StyledModalButtonWrapper>{children}</StyledModalButtonWrapper>;
};

export default ModalButtonWrapper;

const StyledModalButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
`;
