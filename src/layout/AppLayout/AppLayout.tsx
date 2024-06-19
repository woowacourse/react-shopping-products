import { HTMLAttributes, ReactNode } from "react";
import { Wrapper, App } from "./AppLayout.style";

interface AppLayoutProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const AppLayout = ({ children, ...props }: AppLayoutProps) => {
  return (
    <Wrapper {...props}>
      <App>{children}</App>
    </Wrapper>
  );
};

export default AppLayout;
