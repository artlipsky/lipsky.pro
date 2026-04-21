import { spectrum } from "../data/spectrum";
import { RING_CONFIG, wedgePath } from "./ringGeometry";

interface Props {
  id: string;
  includeInner?: boolean;
}

export default function RingClip({ id, includeInner = false }: Props) {
  return (
    <defs>
      <clipPath id={id} clipPathUnits="objectBoundingBox">
        {spectrum.map((_, i) => (
          <path key={`outer-${i}`} d={wedgePath(i, { bbox: true })} />
        ))}
        {includeInner &&
          spectrum.map((_, i) => (
            <path
              key={`inner-${i}`}
              d={wedgePath(i, {
                bbox: true,
                outerR: RING_CONFIG.innerWedgeOuterR,
                innerR: RING_CONFIG.innerWedgeInnerR,
                cornerStroke: RING_CONFIG.innerCornerStroke,
                uniformGap: RING_CONFIG.innerUniformGap,
              })}
            />
          ))}
      </clipPath>
    </defs>
  );
}
