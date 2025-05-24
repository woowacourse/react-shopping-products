import { useState } from "react";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import * as styles from "./Dropdown.style";

export default function Dropdown<T extends string>({
  list,
  value,
  onSelect,
  placeholder,
}: {
  list: readonly T[];
  value: T | null;
  onSelect: (value: T) => void;
  placeholder: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen((prev) => !prev);

  const ref = useOutsideClick<HTMLDivElement>(() => setIsOpen(false));

  const handleSelect = (item: T) => {
    onSelect(item);
    setIsOpen(false);
  };

  return (
    <div css={styles.wrapperCss} ref={ref}>
      <button
        type="button"
        autoFocus={value === ""}
        css={[
          styles.selectBoxCss,
          isOpen && styles.openCss,
          value ? styles.selectedCss : styles.unSelectedCss,
        ]}
        onClick={handleToggle}
      >
        {value || placeholder}
        <img src="assets/dropdownArrow.svg"></img>
      </button>
      {isOpen && (
        <ul css={styles.listCss}>
          {list.map((item) => (
            <li
              key={item}
              css={styles.itemCss}
              onClick={() => handleSelect(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
