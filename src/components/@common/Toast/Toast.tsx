import { PropsWithChildren, useEffect, useState } from "react";

interface Props {
  duration?: number;
  enable: boolean;
  onEnd?: () => void;
}

const Toast = ({
  children,
  duration = 5000,
  enable: defaultEnable = false,
  onEnd,
}: PropsWithChildren<Props>) => {
  const [enable, setEnable] = useState(defaultEnable);

  useEffect(() => {
    const timer = setTimeout(() => {
      setEnable(false);
      onEnd?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onEnd]);

  useEffect(() => setEnable(defaultEnable), [defaultEnable]);

  if (!enable) return null;

  return <>{children}</>;
};

export default Toast;
