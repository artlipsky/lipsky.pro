import { useCallback, useState } from "react";
import { mod } from "../../../../math/mod";
import { CHORD_INFO } from "../data/degrees";
import {
  chromaticFromFifthsOffset,
  fifthsOffsetFromChromatic,
  FIFTH_SEMITONES,
  NOTES_PER_OCTAVE,
  RELATIVE_MAJOR_SHIFT,
  RELATIVE_MINOR_SHIFT,
} from "../data/intervals";
import { scales } from "../data/scales";
import { useCarouselOffset } from "../state/useCarouselOffset";
import { usePalette } from "../state/usePalette";
import type { Mode } from "../types";
import ModeSelect from "../ui/ModeSelect";
import PaletteSelect from "../ui/PaletteSelect";
import TonicSelect from "../ui/TonicSelect";
import CircleOfFifthsRing from "./CircleOfFifthsRing";

interface Props {
  className?: string;
}

export default function CircleOfFifthsStage({ className }: Props) {
  const [mode, setMode] = useState<Mode>("major");
  const { paletteId, setPaletteId, spectrum } = usePalette(CHORD_INFO);
  const { offset, animating, handleWheel, shift, jumpTo } = useCarouselOffset();
  const tonicIndex = chromaticFromFifthsOffset(offset);

  const inScale = useCallback(
    (i: number) => scales.find((s) => s.id === mode)?.degrees.includes(i) ?? true,
    [mode],
  );

  const handleTonicChange = (idx: number) => {
    jumpTo(fifthsOffsetFromChromatic(idx));
  };

  const handleInnerClick = (i: number) => {
    const outerAtI = mod((i + offset) * FIFTH_SEMITONES, NOTES_PER_OCTAVE);
    const relativeShift = mode === "major" ? RELATIVE_MINOR_SHIFT : RELATIVE_MAJOR_SHIFT;
    const newTonic = mod(outerAtI + relativeShift, NOTES_PER_OCTAVE);
    jumpTo(fifthsOffsetFromChromatic(newTonic));
    setMode(mode === "major" ? "minor" : "major");
  };

  return (
    <section className={`flex flex-col items-center gap-16 w-full ${className ?? ""}`}>
      <div className="flex items-center gap-2">
        <TonicSelect value={tonicIndex} onChange={handleTonicChange} />
        <ModeSelect value={mode} onChange={setMode} />
        <PaletteSelect value={paletteId} onChange={setPaletteId} />
      </div>
      <CircleOfFifthsRing
        spectrum={spectrum}
        offset={offset}
        animating={animating}
        inScale={inScale}
        mode={mode}
        onShiftBy={shift}
        onInnerClick={handleInnerClick}
        onWheel={handleWheel}
      />
    </section>
  );
}
