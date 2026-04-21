import { mod } from "../../../../math/mod";
import TonicSelect from "../primitives/TonicSelect";
import { NOTES_PER_OCTAVE } from "../primitives/types";
import { useCarouselOffset } from "../primitives/useCarouselOffset";
import CircleOfFifthsRing from "./CircleOfFifthsRing";

interface Props {
  className?: string;
}

const FIFTH_SEMITONES = 7;

export default function CircleOfFifthsStage({ className }: Props) {
  const { offset, animating, handleWheel, shift, jumpTo } = useCarouselOffset();
  const tonicIndex = mod(offset * FIFTH_SEMITONES, NOTES_PER_OCTAVE);

  return (
    <section className={`flex flex-col items-center gap-16 w-full ${className ?? ""}`}>
      <TonicSelect value={tonicIndex} onChange={(idx) => jumpTo(mod(idx * FIFTH_SEMITONES, NOTES_PER_OCTAVE))} />
      <CircleOfFifthsRing offset={offset} animating={animating} onShiftBy={shift} onWheel={handleWheel} />
    </section>
  );
}
