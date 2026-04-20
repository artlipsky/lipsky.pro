import { spectrum } from "../../../data/spectrum";
import SpectrumTile from "./SpectrumTile";
import { NOTES_PER_OCTAVE, type SpectrumViewProps } from "./types";
import WheelArea from "./WheelArea";

export default function SpectrumLine({ offset, animating, inScale, onShiftBy, onWheel, className }: SpectrumViewProps) {
  return (
    <WheelArea onWheel={onWheel} className={`w-full ${className ?? ""}`}>
      <div
        className="gap-1 grid select-none"
        style={{ gridTemplateColumns: `repeat(${NOTES_PER_OCTAVE}, minmax(0, 1fr))` }}
      >
        {spectrum.map((step, i) => (
          <SpectrumTile
            key={step.degree}
            step={step}
            index={i}
            offset={offset}
            animating={animating}
            active={inScale(i)}
            onClick={() => onShiftBy(i)}
          />
        ))}
      </div>
    </WheelArea>
  );
}
