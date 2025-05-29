import { useEffect } from "react";

const useKeyEscClose = (onHide: () => void) => {
  useEffect(() => {
    const escKeyModalClose = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onHide();
      }
    };
    window.addEventListener("keydown", escKeyModalClose);
    return () => window.removeEventListener("keydown", escKeyModalClose);
  }, [onHide]);
};

export default useKeyEscClose;
