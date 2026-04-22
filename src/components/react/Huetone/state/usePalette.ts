import { useMemo, useState } from "react";
import type { DegreeInfo } from "../data/degrees";
import {
  DEFAULT_PALETTE,
  getSpectrum,
  type PaletteId,
} from "../data/palettes";

export function usePalette(info?: readonly DegreeInfo[]) {
  const [paletteId, setPaletteId] = useState<PaletteId>(DEFAULT_PALETTE);
  const spectrum = useMemo(() => getSpectrum(paletteId, info), [paletteId, info]);
  return { paletteId, setPaletteId, spectrum };
}
