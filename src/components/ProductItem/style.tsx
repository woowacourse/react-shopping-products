import styled from '@emotion/styled';

export const ProductItem = styled.li`
  width: 100%;
  height: 14rem;
`;

export const Image = styled.img`
  width: 100%;
  height: 7rem;
  object-fit: contain;

  border-radius: 8px 8px 0 0;
`;

export const InformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6875rem;

  width: 100%;
  padding: 0.5rem;
`;

export const Information = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Name = styled.h2`
  height: 0.9375rem;

  ${(props) => props.theme.typography.product.name}
  color: ${(props) => props.theme.color.darkBlack}
`;

export const Price = styled.p`
  height: 0.9375rem;

  ${(props) => props.theme.typography.product.price}
  color: ${(props) => props.theme.color.darkBlack}
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const ToggleButton = styled.button<{ $isInCart: boolean }>`
  display: flex;
  gap: 0.25rem;
  align-items: center;

  width: 3.6875rem;
  height: 1.5rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;

  background-color: ${(props) =>
    props.$isInCart ? props.theme.color.gray : props.theme.color.black};

  ${(props) => props.theme.typography.product.toggleButton};
  color: ${(props) => (props.$isInCart ? props.theme.color.black : props.theme.color.white)};
`;

export const ButtonImage = styled.img`
  width: 1rem;
  height: 1rem;
`;
