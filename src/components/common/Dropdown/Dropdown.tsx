import { useDropdownContext, DropdownProvider } from './provider/DropdownProvider';

import { DownArrow, UpArrow } from '@assets/svg';

import * as Styled from './Dropdown.styled';

type OptionType = React.FC<
  React.PropsWithChildren<{
    isSelected: boolean;
    onSelectOption: () => void;
    onHoverOption?: () => void;
  }>
>;
type MenuType = React.FC<React.PropsWithChildren>;
type TriggerType = React.FC<React.PropsWithChildren<{ placeholder: string; value?: string }>>;

const Dropdown: React.FC<
  React.PropsWithChildren<{ isOpen: boolean; onToggleDropdown: () => void }>
> & {
  Trigger: TriggerType;
  Menu: MenuType;
  Option: OptionType;
} = ({ isOpen, onToggleDropdown, children }) => {
  return (
    <DropdownProvider value={{ isOpen, onToggleDropdown }}>
      <Styled.DropdownContainer>{children}</Styled.DropdownContainer>
    </DropdownProvider>
  );
};

const Trigger: TriggerType = ({ placeholder, value }) => {
  const { isOpen, onToggleDropdown } = useDropdownContext()!;

  return (
    <Styled.DropdownTriggerContainer $isOpen={isOpen} $value={value} onClick={onToggleDropdown}>
      <span>{value || placeholder}</span>
      {isOpen ? <DownArrow /> : <UpArrow />}
    </Styled.DropdownTriggerContainer>
  );
};

const Menu: MenuType = ({ children }) => {
  const { isOpen } = useDropdownContext()!;

  return isOpen ? (
    <Styled.DropdownMenuContainer $isOpen={isOpen}>{children}</Styled.DropdownMenuContainer>
  ) : null;
};

const Option: OptionType = ({ isSelected, onSelectOption, onHoverOption, children }) => {
  return (
    <Styled.DropdownOptionContainer
      $isSelected={isSelected}
      onMouseEnter={onHoverOption}
      onClick={onSelectOption}
    >
      {children}
    </Styled.DropdownOptionContainer>
  );
};

Dropdown.Trigger = Trigger;
Dropdown.Menu = Menu;
Dropdown.Option = Option;

export default Dropdown;
