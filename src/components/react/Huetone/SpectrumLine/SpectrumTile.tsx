import { notes } from "../data/notes";
import type { Degree } from "../data/spectrum";
import { mod } from "../../../../math/mod";
import DegreeLabel from "../primitives/DegreeLabel";
import NoteLabel from "../primitives/NoteLabel";
import {
  HOVER_DIM_GROUP,
  INACTIVE_BG_CLASS,
  NOTES_PER_OCTAVE,
  transformTransition,
} from "../primitives/types";
import { STRIP_CENTER, STRIP_SLOTS } from "./stripConstants";

interface Props {
  step: Degree;
  index: number;
  offset: number;
  animating: boolean;
  active: boolean;
  onClick: () => void;
}

export default function SpectrumTile({ step, index, offset, animating, active, onClick }: Props) {
  const bgClass = active ? step.bg : INACTIVE_BG_CLASS;
  const stripNotes = Array.from(
    { length: STRIP_SLOTS },
    (_, idx) => notes[mod(index + idx - STRIP_CENTER, NOTES_PER_OCTAVE)],
  );

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Set ${notes[mod(offset + index, NOTES_PER_OCTAVE)]} (${step.name}) as tonic`}
      className="group flex flex-col items-center gap-2 min-w-0 text-center cursor-pointer"
    >
      <div className="relative flex items-center rounded-md w-full h-16 md:h-20 overflow-hidden">
        <div className={`${bgClass} absolute inset-0 ${HOVER_DIM_GROUP}`} />
        <div
          className="relative flex items-center h-full shrink-0"
          style={{
            width: `${STRIP_SLOTS * 100}%`,
            transform: `translateX(-${((offset + STRIP_CENTER) * 100) / STRIP_SLOTS}%)`,
            transition: transformTransition(animating),
          }}
        >
          {stripNotes.map((note, idx) => (
            <div key={idx} className="flex justify-center items-center h-full shrink-0" style={{ width: `${100 / STRIP_SLOTS}%` }}>
              <NoteLabel note={note} />
            </div>
          ))}
        </div>
      </div>
      <DegreeLabel degree={step.degree} name={step.name} />
    </button>
  );
}
