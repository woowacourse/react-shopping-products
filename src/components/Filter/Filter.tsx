import { HTMLAttributes } from "react";
import { Wrapper } from "./Filter.style";

interface FilterProps extends HTMLAttributes<HTMLDivElement> {}

const Filter = ({ ...rest }: FilterProps) => {
  return <Wrapper {...rest}></Wrapper>;
};

export default Filter;
