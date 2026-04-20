import { useCallback, useEffect, useRef, useState } from "react";
import { mod } from "../../../math/mod";
import { NOTES_PER_OCTAVE } from "../Spectrum/types";

interface Config {
  wheelMinInterval?: number;
  normalizeDelay?: number;
  modulo?: number;
}

export function useCarouselOffset({
  wheelMinInterval = 80,
  normalizeDelay = 300,
  modulo = NOTES_PER_OCTAVE,
}: Config = {}) {
  const [offset, setOffset] = useState(0);
  const [animating, setAnimating] = useState(true);
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
      setOffset((prev) => mod(prev, modulo));
    }, normalizeDelay);
    return () => {
      if (normalizeTimerRef.current !== null) {
        window.clearTimeout(normalizeTimerRef.current);
      }
    };
  }, [offset, modulo, normalizeDelay]);

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();
      const now = Date.now();
      if (now - lastTickRef.current < wheelMinInterval) return;
      lastTickRef.current = now;
      const step = Math.sign(e.deltaY);
      if (step === 0) return;
      setAnimating(true);
      setOffset((prev) => prev + step);
    },
    [wheelMinInterval],
  );

  const shift = useCallback((delta: number) => {
    setAnimating(true);
    setOffset((prev) => prev + delta);
  }, []);

  const jumpTo = useCallback((value: number) => {
    setAnimating(false);
    setOffset(value);
  }, []);

  return { offset, animating, handleWheel, shift, jumpTo };
}
