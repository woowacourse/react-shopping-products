import { useEffect } from "react";

export function useLockUserInteraction(locked: boolean) {
  const preventKeys = (e: KeyboardEvent) => {
    const keys = ["ArrowUp", "ArrowDown", "Space", "PageUp", "PageDown"];
    if (keys.includes(e.code)) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    const preventScrollEvent = (e: Event) => {
      e.preventDefault();
    };

    if (locked) {
      window.addEventListener("wheel", preventScrollEvent, { passive: false });
      window.addEventListener("keydown", preventKeys);

      window.addEventListener("touchmove", preventScrollEvent, {
        passive: false,
      });
    }

    return () => {
      window.removeEventListener("wheel", preventScrollEvent);
      window.removeEventListener("touchmove", preventScrollEvent);
      window.removeEventListener("keydown", preventKeys);
    };
  }, [locked]);
  ``;
}
