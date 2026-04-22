import { NOTES_PER_OCTAVE } from "../data/intervals";
import { innerWedgePath, wedgePath } from "./ringGeometry";

interface Props {
  id: string;
  includeInner?: boolean;
}

const WEDGE_INDICES = Array.from({ length: NOTES_PER_OCTAVE }, (_, i) => i);

export default function RingClip({ id, includeInner = false }: Props) {
  return (
    <defs>
      <clipPath id={id} clipPathUnits="objectBoundingBox">
        {WEDGE_INDICES.map((i) => (
          <path key={`outer-${i}`} d={wedgePath(i, { bbox: true })} />
        ))}
        {includeInner &&
          WEDGE_INDICES.map((i) => (
            <path key={`inner-${i}`} d={innerWedgePath(i, { bbox: true })} />
          ))}
      </clipPath>
    </defs>
  );
}
