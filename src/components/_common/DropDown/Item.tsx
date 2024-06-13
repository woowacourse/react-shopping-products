import React from "react";

import useDropDown from "../../../hooks/useDropDown";

import * as Styled from "./DropDown.style";

interface ItemProps {
  id: string;
  children: React.ReactNode;
  isSelected?: boolean;
}

export default function Item({ id, children, isSelected = false }: ItemProps) {
  const { onChange, toggleDropDown } = useDropDown();

  const onItemClick = () => {
    onChange(id);
    toggleDropDown();
  };

  return (
    <Styled.DropDownItem
      onClick={onItemClick}
      $isSelected={isSelected}
    >
      {children}
    </Styled.DropDownItem>
  );
}
