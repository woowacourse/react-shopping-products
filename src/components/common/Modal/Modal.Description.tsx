import styled from '@emotion/styled';

type ModalDescriptionProps = {
  /**
   * The description of the modal
   */
  description?: string;
};

const ModalDescription = ({ description }: ModalDescriptionProps) => {
  return (
    <>
      {description && (
        <StyledModalDescription aria-label={description}>{description}</StyledModalDescription>
      )}
    </>
  );
};

export default ModalDescription;

const StyledModalDescription = styled.p`
  font-size: 16px;
  font-weight: 400;
`;
