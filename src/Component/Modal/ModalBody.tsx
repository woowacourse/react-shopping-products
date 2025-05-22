import { ComponentProps, PropsWithChildren } from 'react';

function ModalBody({
  children,
  ...props
}: PropsWithChildren<ComponentProps<'div'>>) {
  return <div {...props}>{children}</div>;
}

export default ModalBody;
