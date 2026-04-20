import { notes } from "../../../data/notes";
import NoteLabel from "./NoteLabel";
import { polarPercent, RING_CONFIG, RING_START_ANGLE } from "./ringGeometry";
import { ANGLE_PER_NOTE } from "./types";

interface Props {
  clipPathId: string;
  rotationDeg: number;
  transition: string;
}

export default function RingNotesLayer({ clipPathId, rotationDeg, transition }: Props) {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ clipPath: `url(#${clipPathId})` }}>
      <div className="absolute inset-0" style={{ transform: `rotate(${-rotationDeg}deg)`, transition }}>
        {notes.map((note, j) => {
          const { x, y } = polarPercent(RING_START_ANGLE + j * ANGLE_PER_NOTE, RING_CONFIG.textR);
          return (
            <div
              key={j}
              className="absolute"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: `translate(-50%, -50%) rotate(${rotationDeg}deg)`,
                transition,
              }}
            >
              <NoteLabel note={note} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
