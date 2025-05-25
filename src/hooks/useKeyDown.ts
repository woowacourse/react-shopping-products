import { useEffect } from "react";

interface UseKeyDownPrams {
  keys: string[];
  callback: () => void;
}

const useKeyDown = ({ keys, callback }: UseKeyDownPrams) => {
  useEffect(
    function keyDownEffect() {
      const handleDocumentKeyDown = (e: KeyboardEvent) => {
        if (keys.includes(e.key)) {
          callback();
        }
      };

      document.addEventListener("keydown", handleDocumentKeyDown);

      return () => {
        document.removeEventListener("keydown", handleDocumentKeyDown);
      };
    },
    [keys, callback]
  );
};

export default useKeyDown;
