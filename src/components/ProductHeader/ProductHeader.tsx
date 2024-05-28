import { categoryOptions, sortOptions } from "../../constants/options";
import { DropDown } from "../DropDown/DropDown";
import { StyledDropDownContainer, StyledHeader, StyledTitle } from "./ProductHeader.styled";

export const ProductHeader = () => {
  return (
    <StyledHeader>
      <StyledTitle>상품 목록</StyledTitle>
      <StyledDropDownContainer>
        <DropDown onClick={() => {}} options={categoryOptions} />
        <DropDown onClick={() => {}} options={sortOptions} />
      </StyledDropDownContainer>
    </StyledHeader>
  );
};
