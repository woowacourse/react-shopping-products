import css from './Text.module.css';

type Children = string | number;

type Tag = 'p' | 'span' | 'pre';

type Type = 'h1' | 'h2' | 'b1';

export interface TextProps {
  children: Children;
  className?: string;
  tag: Tag;
  type: Type;
}

export const Text = ({ className, children, tag: Tag, type }: TextProps) => {
  return <Tag className={`${css[type]} ${className}`}>{children}</Tag>;
};
