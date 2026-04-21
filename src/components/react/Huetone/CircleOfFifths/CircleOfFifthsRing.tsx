import { useId } from "react";
import { FIFTHS_ORDER } from "../data/fifths";
import { spectrum } from "../data/spectrum";
import RingCenterLabel from "../primitives/RingCenterLabel";
import RingClip from "../primitives/RingClip";
import RingDegreesLayer from "../primitives/RingDegreesLayer";
import RingNotesLayer from "../primitives/RingNotesLayer";
import Wedge from "../primitives/Wedge";
import { RING_CONFIG, RING_VIEWBOX, wedgePath } from "../primitives/ringGeometry";
import { ANGLE_PER_NOTE, transformTransition, type ViewProps } from "../primitives/types";
import WheelArea from "../primitives/WheelArea";

export default function CircleOfFifthsRing({
  offset,
  animating,
  inScale,
  onShiftBy,
  onWheel,
  label,
  className,
}: ViewProps) {
  const rotationDeg = offset * ANGLE_PER_NOTE;
  const transition = transformTransition(animating);
  const clipPathId = useId();
  const isActive = inScale ?? (() => true);

  return (
    <WheelArea onWheel={onWheel} className={`relative w-80 md:w-120 aspect-square ${className ?? ""}`}>
      <svg
        viewBox={RING_VIEWBOX}
        className="absolute inset-0 w-full h-full select-none"
        role="img"
        aria-label="Circle of fifths"
      >
        <RingClip id={clipPathId} />
        {FIFTHS_ORDER.map((degreeIdx, i) => (
          <Wedge
            key={i}
            step={spectrum[degreeIdx]}
            path={wedgePath(i)}
            active={isActive(degreeIdx)}
            strokeWidth={RING_CONFIG.cornerStroke}
            onClick={() => onShiftBy(i)}
          />
        ))}
      </svg>

      <RingNotesLayer
        clipPathId={clipPathId}
        rotationDeg={rotationDeg}
        transition={transition}
        positionOf={(j) => FIFTHS_ORDER[j]}
      />
      <RingDegreesLayer order={FIFTHS_ORDER} />

      {label && <RingCenterLabel>{label}</RingCenterLabel>}
    </WheelArea>
  );
}
