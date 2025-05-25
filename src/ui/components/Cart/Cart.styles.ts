import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 24px 0 24px 0;
  gap: 24px;
`;

export const CartProduct = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  padding: 8px 0 0 0 ;
  border-top: 1px solid #0000001A;
`;

export const CartProductImage = styled.img`
  width: 80px;
  height: 80px;
  background-color: #ccc;
  border-radius: 8px;
    object-fit: cover;
`;

export const CartContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 9px 16px;
  flex: 1;
`;

export const ProductTitle = styled.h2`
  font-weight: 700;
  font-size: 16px;
  line-height: 100%;
`;

export const ProductPrice = styled.p`
  margin: 4px 0 0 0;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  vertical-align: middle;
`;

export const ProductDescription = styled.p`
  font-size: 14px;
  color: #666;
`;

export const DeleteButton = styled.button`
  width: 40px;
  height: 24px;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  color: #0A0D13;
  border-radius: 4px;
  border: 1px solid #0000001A;
  cursor: pointer;
  background-color: white;

  &:hover {
    background-color: #0000001A;
  }
`;

export const TotalContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 54px;
  margin: 24px 0;
  padding: 30px 0;
  border-top: 1px solid #0000001A;
`;

export const Title = styled.h2`
  font-weight: 700;
  font-size: 16px;
  line-height: 16px;
`;

export const TotalPrice = styled.h1`
  font-weight: 700;
  font-size: 24px;
  line-height: 100%;
  text-align: right;
`;

export const CloseButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: white;
  height: 44px;
  border-radius: 5px;
  background-color: #333333;
  font-weight: 700;
  font-size: 15px;
  line-height: 100%;
  text-align: center;
  cursor: pointer;
`;
