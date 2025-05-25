import styled from "@emotion/styled";
import { ProductTypes } from "../../../types/ProductTypes";

export const StyledLi = styled.li`
  height: 224px;
  border-radius: 8px;
`;

type ImgWrapperProps = Pick<ProductTypes, "imageUrl">;
type StyledButtonProps = Pick<ProductTypes, "isItemInCart">;

export const StyledImgWrapper = styled.div<ImgWrapperProps>`
  width: 100%;
  height: 50%;
  background-image: ${(props) => `url(${props.imageUrl})`};
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 8px 8px 0px 0px;
`;

export const StyledProductInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 50%;
  padding: 8px 15px 8px 8px;
  box-sizing: border-box;
`;

export const StyledTitle = styled.span`
  font-weight: 700;
  font-size: 14px;
`;

export const StyledPrice = styled.span`
  font-weight: 500;
  font-size: 12px;
`;

export const StyledButton = styled.button<StyledButtonProps>`
  width: 59px;
  height: 24px;
  padding: 4px 8px;
  gap: 4px;
  border-radius: 4px;
  background-color: ${(props) => (props.isItemInCart ? "#000000" : "#EAEAEA")};
  color: ${(props) => (props.isItemInCart ? "#FFFFFF" : "#000000")};
  display: flex;
  justify-content: center;
  gap: 4px;
  align-items: center;
  border: none;
  cursor: pointer;
`;

export const StyledImg = styled.img`
  width: 15px;
  height: 15px;
`;

export const StyledProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const StyledButtonWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: flex-end;
  justify-content: flex-end;
`;

export const StyledButtonText = styled.span`
  font-size: 12px;
  font-weight: 600;
`;
