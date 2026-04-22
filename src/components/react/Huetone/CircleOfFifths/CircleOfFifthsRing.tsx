import { useId } from "react";
import { mod } from "../../../../math/mod";
import {
  FIFTH_SEMITONES,
  FIFTHS_ORDER,
  NOTES_PER_OCTAVE,
  RELATIVE_MAJOR_SHIFT,
  RELATIVE_MINOR_SHIFT,
} from "../data/intervals";
import { getKeyNotation } from "../data/keyNotation";
import RingClip from "../ring/RingClip";
import RingDegreesLayer from "../ring/RingDegreesLayer";
import RingNotesLayer from "../ring/RingNotesLayer";
import {
  ANGLE_PER_NOTE,
  innerWedgePath,
  RING_CONFIG,
  RING_VIEWBOX,
  wedgePath,
} from "../ring/ringGeometry";
import { transformTransition } from "../theme";
import type { Mode, ViewProps } from "../types";
import ViewLabel from "../ui/ViewLabel";
import Wedge from "../ui/Wedge";
import WheelArea from "../ui/WheelArea";

interface Props extends ViewProps {
  mode?: Mode;
  onInnerClick?: (i: number) => void;
}

export default function CircleOfFifthsRing({
  spectrum,
  offset,
  animating,
  inScale,
  onShiftBy,
  onWheel,
  label,
  className,
  mode = "major",
  onInnerClick,
}: Props) {
  const rotationDeg = offset * ANGLE_PER_NOTE;
  const transition = transformTransition(animating);
  const clipPathId = useId();
  const isActive = inScale ?? (() => true);

  const tonicChromatic = mod(offset * FIFTH_SEMITONES, NOTES_PER_OCTAVE);
  const notation = getKeyNotation(tonicChromatic, mode === "minor");

  const isMinor = mode === "minor";
  const innerShift = isMinor ? RELATIVE_MAJOR_SHIFT : RELATIVE_MINOR_SHIFT;
  const outerAt = isMinor ? notation.minor : notation.major;
  const innerAt = isMinor ? notation.major : notation.minor;
  const innerLabel = (j: number) => innerAt(mod(j + innerShift, NOTES_PER_OCTAVE));

  return (
    <WheelArea onWheel={onWheel} className={`relative w-80 md:w-120 aspect-square ${className ?? ""}`}>
      <svg
        viewBox={RING_VIEWBOX}
        className="absolute inset-0 w-full h-full select-none"
        role="img"
        aria-label="Circle of fifths"
      >
        <RingClip id={clipPathId} includeInner />

        {FIFTHS_ORDER.map((degreeIdx, i) => (
          <Wedge
            key={`outer-${i}`}
            step={spectrum[degreeIdx]}
            path={wedgePath(i)}
            active={isActive(degreeIdx)}
            strokeWidth={RING_CONFIG.cornerStroke}
            onClick={() => onShiftBy(i)}
          />
        ))}

        {FIFTHS_ORDER.map((degreeIdx, i) => {
          const innerDegreeIdx = mod(degreeIdx + innerShift, NOTES_PER_OCTAVE);
          return (
            <Wedge
              key={`inner-${i}`}
              step={spectrum[innerDegreeIdx]}
              path={innerWedgePath(i)}
              active={isActive(innerDegreeIdx)}
              strokeWidth={RING_CONFIG.innerCornerStroke}
              onClick={() => (onInnerClick ?? onShiftBy)(i)}
            />
          );
        })}
      </svg>

      <RingNotesLayer
        clipPathId={clipPathId}
        rotationDeg={rotationDeg}
        transition={transition}
        positionOf={(j) => FIFTHS_ORDER[j]}
        label={outerAt}
      />
      <RingNotesLayer
        clipPathId={clipPathId}
        rotationDeg={rotationDeg}
        transition={transition}
        positionOf={(j) => FIFTHS_ORDER[j]}
        radius={RING_CONFIG.innerTextR}
        label={innerLabel}
      />

      <RingDegreesLayer order={FIFTHS_ORDER} info={spectrum} />

      {label && (
        <div className="absolute inset-0 flex justify-center items-center px-8 pointer-events-none">
          <ViewLabel>{label}</ViewLabel>
        </div>
      )}
    </WheelArea>
  );
}
