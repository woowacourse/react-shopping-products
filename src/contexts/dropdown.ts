import { createContext } from "react";

interface DropDownContextInterface {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onChange: (args: any) => void;
}

const DropdownContext = createContext<DropDownContextInterface | null>(null);

export default DropdownContext;
