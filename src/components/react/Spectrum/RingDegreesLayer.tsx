import { spectrum } from "../../../data/spectrum";
import DegreeLabel from "./DegreeLabel";
import { polarPercent, RING_CONFIG, RING_START_ANGLE } from "./ringGeometry";
import { ANGLE_PER_NOTE } from "./types";

export default function RingDegreesLayer() {
  return (
    <>
      {spectrum.map((step, i) => {
        const { x, y } = polarPercent(RING_START_ANGLE + i * ANGLE_PER_NOTE, RING_CONFIG.labelR);
        return (
          <div key={i} className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ left: `${x}%`, top: `${y}%` }}>
            <DegreeLabel degree={step.degree} name={step.name} />
          </div>
        );
      })}
    </>
  );
}
