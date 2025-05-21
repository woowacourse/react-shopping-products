import { PropsWithChildren, useEffect, useState } from "react";

interface Props {
  duration?: number;
  visible: boolean;
  onClose?: () => void;
}

const Toast = ({
  children,
  duration = 5000,
  visible: defaultVisible = false,
  onClose,
}: PropsWithChildren<Props>) => {
  const [visible, setVisible] = useState(defaultVisible);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  useEffect(() => setVisible(defaultVisible), [defaultVisible]);

  if (!visible) return null;

  return <>{children}</>;
};

export default Toast;
