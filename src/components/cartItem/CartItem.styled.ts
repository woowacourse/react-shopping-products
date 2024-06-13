import styled from '@emotion/styled';

export const itemWrapper = styled.li`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid ${(props) => props.theme.color.borderGray};
  padding: 0.625rem 0;
`;

export const itemBody = styled.div`
  display: flex;
  gap: 1.25rem;
`;

export const image = styled.img`
  border-radius: 0.5rem;
`;

export const itemContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

export const productName = styled.span`
  ${(props) => props.theme.typography.modalItemName}
`;

export const price = styled.span`
  ${(props) => props.theme.typography.modalItemPrice}
`;

export const deleteButton = styled.button`
  width: 2.5rem;
  height: 1.5rem;

  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid ${(props) => props.theme.color.borderGray};
  border-radius: 0.25rem;
  padding: 0.25rem 0.5rem;

  background-color: ${(props) => props.theme.color.white};

  ${(props) => props.theme.typography.buttonLabel}
`;
