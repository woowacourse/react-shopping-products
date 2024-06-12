import styled from 'styled-components';
import theme from '../../styles/theme';

export const Layout = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid ${theme.color.primary.light};
  padding: 10px 0px 20px 0px;
  row-gap: 12px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Body = styled.div`
  display: flex;
  column-gap: 20px;
`;

export const ItemImage = styled.img`
  display: flex;
  width: 80px;
  height: 80px;
  border-radius: 8px;
`;

export const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 8px;
  padding: 8px;
`;

export const ItemInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 4px;
`;

export const ItemText = styled.p`
  font-size: ${theme.fontSize.md};
  font-weight: ${theme.fontWeight.bold};
`;

export const ItemPriceText = styled.p`
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.light};
`;

export const DeleteButton = styled.button`
  width: 40px;
  height: 24px;
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.light};
  padding: 0px 8px;
  border: 1px solid ${theme.color.primary.light};
  border-radius: 4px;
  cursor: pointer;
`;
