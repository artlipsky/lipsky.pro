import { useState } from "react";
import { DEFAULT_SCALE_ID, scales } from "../data/scales";

export function useScale(initial: string = DEFAULT_SCALE_ID) {
  const [scaleId, setScaleId] = useState(initial);
  const scale = scales.find((s) => s.id === scaleId) ?? scales[0];
  const inScale = (i: number) => scale.degrees.includes(i);
  return { scaleId, setScaleId, scale, inScale };
}
