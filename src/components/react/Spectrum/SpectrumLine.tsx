import { spectrum } from "../../../data/spectrum";
import SpectrumLabel from "./SpectrumLabel";
import SpectrumTile from "./SpectrumTile";
import { NOTES_PER_OCTAVE, type SpectrumViewProps } from "./types";
import WheelArea from "./WheelArea";

export default function SpectrumLine({ offset, animating, inScale, onShiftBy, onWheel, label, className }: SpectrumViewProps) {
  return (
    <WheelArea onWheel={onWheel} className={`flex flex-col gap-4 w-full ${className ?? ""}`}>
      {label && <SpectrumLabel>{label}</SpectrumLabel>}
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
