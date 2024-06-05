import { HTMLAttributes } from "react";
import { Wrapper, Select } from "./Filter.style";

interface FilterProps extends HTMLAttributes<HTMLDivElement> {}

const Filter = ({ ...rest }: FilterProps) => {
  return (
    <Wrapper {...rest}>
      <Select>
        <option>전체</option>
        <option>패션</option>
        <option>음료수</option>
        <option>전가기기</option>
        <option>책</option>
        <option>주방</option>
        <option>피트니스</option>
      </Select>
      <Select>
        <option>낮은 가격순</option>
        <option>높은 가격순</option>
      </Select>
    </Wrapper>
  );
};

export default Filter;
