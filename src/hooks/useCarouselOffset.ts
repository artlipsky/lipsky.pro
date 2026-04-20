import { useEffect, useRef, useState } from "react";

interface Config {
  wheelMinInterval?: number;
  normalizeDelay?: number;
  modulo?: number;
}

export function useCarouselOffset({
  wheelMinInterval = 80,
  normalizeDelay = 300,
  modulo = 12,
}: Config = {}) {
  const [offset, setOffset] = useState(0);
  const [animating, setAnimating] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const lastTickRef = useRef(0);
  const normalizeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!animating) {
      const id = requestAnimationFrame(() =>
        requestAnimationFrame(() => setAnimating(true)),
      );
      return () => cancelAnimationFrame(id);
    }
  }, [animating]);

  useEffect(() => {
    if (offset === 0) return;
    if (normalizeTimerRef.current !== null) {
      window.clearTimeout(normalizeTimerRef.current);
    }
    normalizeTimerRef.current = window.setTimeout(() => {
      setAnimating(false);
      setOffset((prev) => ((prev % modulo) + modulo) % modulo);
    }, normalizeDelay);
    return () => {
      if (normalizeTimerRef.current !== null) {
        window.clearTimeout(normalizeTimerRef.current);
      }
    };
  }, [offset, modulo, normalizeDelay]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const now = Date.now();
      if (now - lastTickRef.current < wheelMinInterval) return;
      lastTickRef.current = now;
      const step = e.deltaY > 0 ? 1 : -1;
      setAnimating(true);
      setOffset((prev) => prev + step);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [wheelMinInterval]);

  const shift = (delta: number) => {
    setAnimating(true);
    setOffset((prev) => prev + delta);
  };

  const jumpTo = (value: number) => {
    setAnimating(false);
    setOffset(value);
  };

  return { offset, animating, sectionRef, shift, jumpTo };
}
