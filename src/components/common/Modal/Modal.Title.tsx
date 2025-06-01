import styled from '@emotion/styled';

type ModalTitleProps = {
  /**
   * The title of the modal
   */
  title: string;
};

const ModalTitle = ({ title }: ModalTitleProps) => {
  return <StyledModalTitle aria-label={title}>{title}</StyledModalTitle>;
};

export default ModalTitle;

const StyledModalTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: 600;
`;
