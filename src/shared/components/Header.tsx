import { ReactNode } from "react"
import { cn } from "../utils/core";

type HeaderProps = {
  left: ReactNode;
  right?: ReactNode;
}

export const Header = ({left, right}:HeaderProps) => {
  return (
    <header className={cn('min-h-16 top-0 absolute flex items-center w-full p-4 bg-black', {
      'justify-between': right,
      'flex-start': !right,
    })}>
      {left}
      {right}
    </header>
  )
}