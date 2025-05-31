import { useCallback, useEffect } from "react";

function useEscapeKey(onEscape: () => void, enabled: boolean = true) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (enabled && e.key === "Escape") {
        onEscape();
      }
    },
    [onEscape, enabled]
  );

  useEffect(() => {
    if (enabled) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown, enabled]);
}

export default useEscapeKey;
