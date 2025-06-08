import styled from '@emotion/styled';

export const Container = styled.li`
  width: 182px;
  height: 224px;
  border-radius: 8px;
  background-color: white;
`;

export const ProductImageContainer = styled.div`
  width: 182px;
  height: 112px;
  position: relative;
`;

export const ProductImage = styled.img`
  width: 182px;
  height: 112px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  object-fit: cover;
`;

export const Detail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin: 15px 8px 8px 8px;
`;

export const ProductName = styled.h3`
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  color: #0a0d13;
  margin: 0;
`;

export const Price = styled.span`
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  color: #0a0d13;
  margin: 8px 0 0 0;
`;

export const CartAddButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 59px;
  height: 24px;
  border-radius: 4px;
  gap: 4px;
  padding: 4px 8px 4px 8px;
  border: none;
  cursor: pointer;
  margin-left: auto;
  margin-right: 8px;
  background-color: #000000;
`;

export const CartRemoveButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 59px;
  height: 24px;
  border-radius: 4px;
  gap: 4px;
  padding: 4px 8px 4px 8px;
  border: none;
  cursor: pointer;
  margin-left: auto;
  margin-right: 8px;
  background-color: #eaeaea;
`;

export const CartButtonImg = styled.img`
  width: 16px;
  height: 16px;
`;

export const CartAddButtonText = styled.span`
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  color: #ffffff;
`;

export const CartRemoveButtonText = styled.span`
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  color: #000000;
`;

export const SoldOutOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

export const SoldOutText = styled.span`
  color: white;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 0.1em;
`;

export const StepperContainer = styled.div`
  gap: 8px;
  margin-left: auto;
  margin-right: 8px;
  margin-top: 0;
`;
