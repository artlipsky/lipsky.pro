import { useEffect, useRef } from "react";
import { DEFAULT_TONIC, flatNotes } from "../../../data/notes";
import { DEFAULT_SCALE_ID, scales } from "../../../data/scales";
import { mod } from "../../../math/mod";
import { NOTES_PER_OCTAVE } from "../Spectrum/types";

interface Args {
  offset: number;
  scaleId: string;
  jumpTo: (value: number) => void;
  setScaleId: (id: string) => void;
  writeDelay?: number;
}

export function useUrlSync({ offset, scaleId, jumpTo, setScaleId, writeDelay = 400 }: Args) {
  const syncedRef = useRef(false);

  useEffect(() => {
    if (syncedRef.current) return;
    syncedRef.current = true;
    const params = new URLSearchParams(window.location.search);
    const tonic = params.get("tonic");
    const scaleParam = params.get("scale");
    if (tonic) {
      const idx = flatNotes.indexOf(tonic);
      if (idx > 0) jumpTo(idx);
    }
    if (scaleParam && scales.some((s) => s.id === scaleParam)) {
      setScaleId(scaleParam);
    }
  }, [jumpTo, setScaleId]);

  useEffect(() => {
    if (!syncedRef.current) return;
    const timer = window.setTimeout(() => {
      const tonic = flatNotes[mod(offset, NOTES_PER_OCTAVE)];
      const params = new URLSearchParams();
      if (tonic !== DEFAULT_TONIC) params.set("tonic", tonic);
      if (scaleId !== DEFAULT_SCALE_ID) params.set("scale", scaleId);
      const query = params.toString();
      const url = query ? `${window.location.pathname}?${query}` : window.location.pathname;
      window.history.replaceState(null, "", url);
    }, writeDelay);
    return () => window.clearTimeout(timer);
  }, [offset, scaleId, writeDelay]);
}
