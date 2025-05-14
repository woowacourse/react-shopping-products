export interface SelectProps<T extends string> {
  options: { value: string; text: string }[];
  onChange: (category: T) => void;
  value: T;
}
