import Styled from '@emotion/styled';
import { Modal } from '@seo_dev/react-modal';

export const HeaderContainer = Styled.div`
  width:100%;
  height:64px;
  display:flex;
  justify-content:space-between;
  align-items:center;
  background-color:black;
  color:white;
  padding:0 24px;
  font-size:20px; 
`;

export const HeaderTitle = Styled.h2`
  font-weight:800;
`;

export const HeaderIconContainer = Styled.div`
  position: relative;
  cursor: pointer;
`;

export const CartBadge = Styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 19px;
  aspect-ratio: 1/1;
  border-radius: 50%;
  background: white;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  font-weight: 700;
`;

export const StyledModalContent = Styled(Modal.Content)`
  padding: 24px;
`;

export const StyledModalTitle = Styled(Modal.Title)`
  font-size: 24px;
  font-weight: 700;
  padding-bottom: 16px;
  border-bottom: 1px solid #ccc;
`;

export const StyledModalContainer = Styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const NoCartProductText = Styled.p`
  font-size:16px;
  margin-top:16px;
`;

export const CloseButton = Styled(Modal.CloseButton)`
  width: 100%;
  background: #333;
  color: white;
  padding:12px;
  border-radius:8px;
  cursor: pointer;
`;

export const productPriceContainer = Styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  font-weight: 700;
`;

export const productPriceTitle = Styled.b`
  font-size: 16px;
`;

export const productAllPrice = Styled.b`
  font-size: 20px;
  font-weight: 700;
`;
