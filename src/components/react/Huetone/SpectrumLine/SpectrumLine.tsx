import { NOTES_PER_OCTAVE } from "../data/intervals";
import type { ViewProps } from "../types";
import ViewLabel from "../ui/ViewLabel";
import WheelArea from "../ui/WheelArea";
import SpectrumTile from "./SpectrumTile";

export default function SpectrumLine({ spectrum, offset, animating, inScale, onShiftBy, onWheel, label, className }: ViewProps) {
  const isActive = inScale ?? (() => true);

  return (
    <WheelArea onWheel={onWheel} className={`flex flex-col gap-4 w-full ${className ?? ""}`}>
      {label && <ViewLabel>{label}</ViewLabel>}
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
            active={isActive(i)}
            onClick={() => onShiftBy(i)}
          />
        ))}
      </div>
    </WheelArea>
  );
}
