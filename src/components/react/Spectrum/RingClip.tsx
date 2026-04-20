import { spectrum } from "../../../data/spectrum";
import { wedgePath } from "./ringGeometry";

interface Props {
  id: string;
}

export default function RingClip({ id }: Props) {
  return (
    <defs>
      <clipPath id={id} clipPathUnits="objectBoundingBox">
        {spectrum.map((_, i) => (
          <path key={i} d={wedgePath(i, true)} />
        ))}
      </clipPath>
    </defs>
  );
}
