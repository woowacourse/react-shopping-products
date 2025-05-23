import {
  createContext,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from "react";
import Toast from "../components/@common/Toast/Toast";

interface ToastContextType {
  showToast: (message: string) => void;
}

export const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider = ({ children }: PropsWithChildren) => {
  const [message, setMessage] = useState("");
  const toastTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (toastTimer.current) {
        clearTimeout(toastTimer.current);
        toastTimer.current = null;
      }
    };
  }, []);

  const showToast = (message: string, duration: number = 4000) => {
    if (toastTimer.current) {
      clearTimeout(toastTimer.current);
      toastTimer.current = null;
    }

    setMessage(message);

    toastTimer.current = setTimeout(() => {
      setMessage("");
      toastTimer.current = null;
    }, duration);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {!!message && <Toast message={message} />}
    </ToastContext.Provider>
  );
};
