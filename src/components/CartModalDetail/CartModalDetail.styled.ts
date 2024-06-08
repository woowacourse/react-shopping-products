import styled from 'styled-components';
import { QuantityUpdateButton } from '../QuantityUpdateButton/QuantityUpdateButton.styled';

export const CartModalDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  overflow-y: scroll;
`;

export const CardContainer = styled.li`
  display: flex;
  flex-direction: column;
  padding: 0.8rem 0 0 0;
  border-color: rgba(0, 0, 0, 0.1);
  border-width: 0.5px 0 0 0;
  border-style: solid;
`;

export const CardContent = styled.div`
  display: flex;
  gap: 2.4rem;
`;

export const ItemImg = styled.img`
  min-width: 8rem;
  width: 8rem;
  height: 8rem;
  border-radius: 0.8rem;

  object-fit: cover;
  object-position: center;
`;

export const CardDetail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;

  box-sizing: border-box;
`;

export const CardDetailWrapper = styled.div`
  display: flex;
`;

export const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  width: 100%;
`;

export const ItemName = styled.p`
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 2.317rem;
  font-family: var(--font-Noto-Sans-KR);
`;

export const ItemPrice = styled.p`
  font-size: 1.2rem;
  line-height: 1.5rem;
`;

export const DeleteButton = styled(QuantityUpdateButton)`
  width: 4rem;

  font-size: 1.2rem;
  line-height: 1.5rem;
`;
