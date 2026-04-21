import { useEffect, useRef } from "react";

export function useNonPassiveWheel<T extends HTMLElement>(
  onWheel?: (e: WheelEvent) => void,
) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !onWheel) return;
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [onWheel]);
  return ref;
}
