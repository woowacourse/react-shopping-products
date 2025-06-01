import { PropsWithChildren, useEffect, useState } from 'react';

import { createPortal } from 'react-dom';

const PortalWrapper = ({ children }: PropsWithChildren) => {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setContainer(document.body);
  }, []);

  if (!container) return null;
  return createPortal(<>{children}</>, container);
};

type Props = {
  /**
   * If true, the modal will be open
   */
  isOpen: boolean;
  /**
   * The content of the modal
   */
  children: React.ReactNode;
} & PropsWithChildren;

const Portal = ({ isOpen, children }: Props) => {
  if (!isOpen) return null;

  return (
    <PortalWrapper>
      <>{isOpen && children}</>
    </PortalWrapper>
  );
};

export default Portal;
