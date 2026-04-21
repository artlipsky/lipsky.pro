import { notes } from "../data/notes";
import NoteLabel from "./NoteLabel";
import { polarPercent, RING_CONFIG, RING_START_ANGLE } from "./ringGeometry";
import { ANGLE_PER_NOTE } from "./types";

interface Props {
  clipPathId: string;
  rotationDeg: number;
  transition: string;
  positionOf?: (noteIndex: number) => number;
  radius?: number;
  label?: (noteIndex: number) => string;
}

export default function RingNotesLayer({
  clipPathId,
  rotationDeg,
  transition,
  positionOf = (j) => j,
  radius = RING_CONFIG.textR,
  label = (j) => notes[j],
}: Props) {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ clipPath: `url(#${clipPathId})` }}>
      <div className="absolute inset-0 pointer-events-none" style={{ transform: `rotate(${-rotationDeg}deg)`, transition }}>
        {notes.map((_, j) => {
          const angularIdx = positionOf(j);
          const { x, y } = polarPercent(RING_START_ANGLE + angularIdx * ANGLE_PER_NOTE, radius);
          return (
            <div
              key={j}
              className="absolute pointer-events-none"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: `translate(-50%, -50%) rotate(${rotationDeg}deg)`,
                transition,
              }}
            >
              <NoteLabel note={label(j)} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
