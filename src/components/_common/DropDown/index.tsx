import React, { useState } from "react";

import DropdownContext from "../../../contexts/dropdown";

import Trigger from "./Trigger";
import Menu from "./Menu";
import Item from "./Item";

import * as Styled from "./DropDown.style";

interface DropDownProps {
  onChange: (args: any) => void;
}

function DropDownMain({ onChange, children }: React.PropsWithChildren<DropDownProps>) {
  const [isOpen, setIsOpen] = useState(false);

  const value = { isOpen, setIsOpen, onChange };

  return (
    <DropdownContext.Provider value={value}>
      <Styled.DropDownContainer>{children}</Styled.DropDownContainer>
    </DropdownContext.Provider>
  );
}

const DropDown = Object.assign(DropDownMain, { Trigger, Menu, Item });

export default DropDown;
