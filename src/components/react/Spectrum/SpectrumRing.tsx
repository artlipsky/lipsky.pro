import { useId } from "react";
import { spectrum } from "../../../data/spectrum";
import RingClip from "./RingClip";
import RingDegreesLayer from "./RingDegreesLayer";
import RingNotesLayer from "./RingNotesLayer";
import SpectrumLabel from "./SpectrumLabel";
import SpectrumWedge from "./SpectrumWedge";
import { RING_CONFIG, RING_VIEWBOX, wedgePath } from "./ringGeometry";
import { ANGLE_PER_NOTE, transformTransition, type SpectrumViewProps } from "./types";
import WheelArea from "./WheelArea";

export default function SpectrumRing({
  offset,
  animating,
  inScale,
  onShiftBy,
  onWheel,
  label,
  className,
}: SpectrumViewProps) {
  const rotationDeg = offset * ANGLE_PER_NOTE;
  const transition = transformTransition(animating);
  const clipPathId = useId();

  return (
    <WheelArea onWheel={onWheel} className={`relative w-80 md:w-120 aspect-square ${className ?? ""}`}>
      <svg
        viewBox={RING_VIEWBOX}
        className="absolute inset-0 w-full h-full select-none"
        role="img"
        aria-label="Circular note spectrum"
      >
        <RingClip id={clipPathId} />
        {spectrum.map((step, i) => (
          <SpectrumWedge
            key={i}
            step={step}
            path={wedgePath(i)}
            active={inScale(i)}
            strokeWidth={RING_CONFIG.cornerStroke}
            onClick={() => onShiftBy(i)}
          />
        ))}
      </svg>

      <RingNotesLayer clipPathId={clipPathId} rotationDeg={rotationDeg} transition={transition} />
      <RingDegreesLayer />

      {label && (
        <div className="absolute inset-0 flex justify-center items-center px-8 pointer-events-none">
          <SpectrumLabel>{label}</SpectrumLabel>
        </div>
      )}
    </WheelArea>
  );
}
