import styled from '@emotion/styled';

export const QuantityContainer = styled.div`
  display: flex;
  gap: 0.25rem;
`;

export const QuantityText = styled.span`
  padding: 0.2813rem 0.25rem;
`;

export const CountButton = styled.button`
  width: 1.5rem;
  height: 1.5rem;

  padding: 0.375rem;

  border-radius: 0.5rem;
  border: 1px solid ${(props) => props.theme.color.borderGray};

  &:hover {
    opacity: 0.7;
  }
`;

export const CountImage = styled.img`
  width: 0.75rem;
  height: 0.75rem;
`;
