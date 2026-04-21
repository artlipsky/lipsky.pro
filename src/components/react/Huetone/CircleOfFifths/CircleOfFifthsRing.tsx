import { useId } from "react";
import { mod } from "../../../../math/mod";
import { FIFTHS_ORDER } from "../data/fifths";
import { spectrum } from "../data/spectrum";
import {
  FIFTH_SEMITONES,
  RELATIVE_MAJOR_SHIFT,
  RELATIVE_MINOR_SHIFT,
} from "../primitives/intervals";
import { getKeyNotation } from "../primitives/keyNotation";
import RingClip from "../primitives/RingClip";
import RingDegreesLayer from "../primitives/RingDegreesLayer";
import RingNotesLayer from "../primitives/RingNotesLayer";
import ViewLabel from "../primitives/ViewLabel";
import Wedge from "../primitives/Wedge";
import { RING_CONFIG, RING_VIEWBOX, wedgePath } from "../primitives/ringGeometry";
import {
  ANGLE_PER_NOTE,
  NOTES_PER_OCTAVE,
  transformTransition,
  type Mode,
  type ViewProps,
} from "../primitives/types";
import WheelArea from "../primitives/WheelArea";

interface Props extends ViewProps {
  mode?: Mode;
  onInnerClick?: (i: number) => void;
}

export default function CircleOfFifthsRing({
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

  const innerShift = mode === "minor" ? RELATIVE_MAJOR_SHIFT : RELATIVE_MINOR_SHIFT;
  const outerLabel = (j: number) => (mode === "minor" ? notation.minor(j) : notation.major(j));
  const innerLabel = (j: number) => {
    const idx = mod(j + innerShift, NOTES_PER_OCTAVE);
    return mode === "minor" ? notation.major(idx) : notation.minor(idx);
  };

  const innerWedgePath = (i: number) =>
    wedgePath(i, {
      outerR: RING_CONFIG.innerWedgeOuterR,
      innerR: RING_CONFIG.innerWedgeInnerR,
      cornerStroke: RING_CONFIG.innerCornerStroke,
      uniformGap: RING_CONFIG.innerUniformGap,
    });

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
        label={outerLabel}
      />
      <RingNotesLayer
        clipPathId={clipPathId}
        rotationDeg={rotationDeg}
        transition={transition}
        positionOf={(j) => FIFTHS_ORDER[j]}
        radius={RING_CONFIG.innerTextR}
        label={innerLabel}
      />

      <RingDegreesLayer order={FIFTHS_ORDER} />

      {label && (
        <div className="absolute inset-0 flex justify-center items-center px-8 pointer-events-none">
          <ViewLabel>{label}</ViewLabel>
        </div>
      )}
    </WheelArea>
  );
}
