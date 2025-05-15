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
    <div css={styles.wrapperStyle} ref={ref}>
      <button
        type="button"
        autoFocus={value === ""}
        css={[
          styles.selectBoxStyle,
          isOpen && styles.openStyle,
          value ? styles.selectedStyle : styles.unSelectedStyle,
        ]}
        onClick={handleToggle}
      >
        {value || placeholder}
        <img src="assets/dropdownArrow.svg"></img>
      </button>
      {isOpen && (
        <ul css={styles.listStyle}>
          {list.map((item) => (
            <li
              key={item}
              css={styles.itemStyle}
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
