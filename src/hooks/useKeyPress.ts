import { useEffect } from "react";

interface useKeyPressProps {
  targetKey: string;
  enabled: boolean;
  onKeyMatch: () => void;
}

export function useKeyPress({
  targetKey,
  enabled,
  onKeyMatch,
}: useKeyPressProps) {
  useEffect(() => {
    if (!enabled) return;
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === targetKey) {
        onKeyMatch();
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [enabled, onKeyMatch, targetKey]);
}
