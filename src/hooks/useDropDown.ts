import { useContext } from "react";
import DropdownContext from "../contexts/dropdown";

export default function useDropDown() {
  const context = useContext(DropdownContext);

  if (!context) {
    throw new Error("DropdownContext는 정의된 스코프 안에서만 사용 가능합니다.");
  }

  const { isOpen, setIsOpen, onChange } = context;

  const toggleDropDown = () => setIsOpen((prev) => !prev);

  return {
    isOpen,
    toggleDropDown,
    onChange,
  };
}
