import React from "react";

import useDropDown from "../../../hooks/useDropDown";

import * as Styled from "./DropDown.style";

export default function Menu({ children }: React.PropsWithChildren) {
  const { isOpen } = useDropDown();

  return <>{isOpen && <Styled.DropDownMenu>{children}</Styled.DropDownMenu>}</>;
}
