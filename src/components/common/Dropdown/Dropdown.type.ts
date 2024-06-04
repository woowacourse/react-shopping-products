export interface DropdownProps {
  options: [string, string][];
  onchange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
