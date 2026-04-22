import { useId } from "react";
import RingClip from "../ring/RingClip";
import RingDegreesLayer from "../ring/RingDegreesLayer";
import RingNotesLayer from "../ring/RingNotesLayer";
import { ANGLE_PER_NOTE, RING_CONFIG, RING_VIEWBOX, wedgePath } from "../ring/ringGeometry";
import { transformTransition } from "../theme";
import type { ViewProps } from "../types";
import ViewLabel from "../ui/ViewLabel";
import Wedge from "../ui/Wedge";
import WheelArea from "../ui/WheelArea";

export default function SpectrumRing({
  spectrum,
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
        aria-label="Circular note spectrum"
      >
        <RingClip id={clipPathId} />
        {spectrum.map((step, i) => (
          <Wedge
            key={i}
            step={step}
            path={wedgePath(i)}
            active={isActive(i)}
            strokeWidth={RING_CONFIG.cornerStroke}
            onClick={() => onShiftBy(i)}
          />
        ))}
      </svg>

      <RingNotesLayer clipPathId={clipPathId} rotationDeg={rotationDeg} transition={transition} />
      <RingDegreesLayer info={spectrum} />

      {label && (
        <div className="absolute inset-0 flex justify-center items-center px-8 pointer-events-none">
          <ViewLabel>{label}</ViewLabel>
        </div>
      )}
    </WheelArea>
  );
}
