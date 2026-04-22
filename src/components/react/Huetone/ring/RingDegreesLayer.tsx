import type { DegreeInfo } from "../data/degrees";
import { NOTES_PER_OCTAVE } from "../data/intervals";
import DegreeLabel from "../ui/DegreeLabel";
import { ANGLE_PER_NOTE, polarPercent, RING_CONFIG, RING_START_ANGLE } from "./ringGeometry";

interface Props {
  info: readonly DegreeInfo[];
  order?: readonly number[];
}

const CHROMATIC_ORDER = Array.from({ length: NOTES_PER_OCTAVE }, (_, i) => i);

export default function RingDegreesLayer({ info, order = CHROMATIC_ORDER }: Props) {
  return (
    <>
      {order.map((degreeIdx, i) => {
        const step = info[degreeIdx];
        const { x, y } = polarPercent(RING_START_ANGLE + i * ANGLE_PER_NOTE, RING_CONFIG.labelR);
        return (
          <div
            key={i}
            className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            <DegreeLabel degree={step.degree} name={step.name} />
          </div>
        );
      })}
    </>
  );
}
