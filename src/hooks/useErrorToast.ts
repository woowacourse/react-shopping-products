import { useEffect, useState } from "react";
import { useErrorContext } from "../hooks";

export default function useErrorToast() {
  const { error } = useErrorContext();
  const [isToastOpen, setIsToastOpen] = useState<boolean>(false);

  useEffect(() => {
    if (error) {
      setIsToastOpen(true);

      const closeTimer = setTimeout(() => {
        setIsToastOpen(false);
      }, 3000);

      return () => {
        clearTimeout(closeTimer);
      };
    }
  }, [error]);

  return {
    isToastOpen,
    error,
  };
}
