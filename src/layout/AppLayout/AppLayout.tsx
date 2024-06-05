import { HTMLAttributes, ReactNode } from "react";
import { Wrapper, App } from "./AppLayout.style";

interface AppLayoutProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const AppLayout = ({ children, ...rest }: AppLayoutProps) => {
  return (
    <Wrapper {...rest}>
      <App>{children}</App>
    </Wrapper>
  );
};

export default AppLayout;
