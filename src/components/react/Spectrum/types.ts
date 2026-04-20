export interface SpectrumViewProps {
  offset: number;
  animating: boolean;
  inScale: (degreeIndex: number) => boolean;
  onShiftBy: (delta: number) => void;
  onWheel?: (e: WheelEvent) => void;
  className?: string;
}

export const SPECTRUM_TRANSITION_MS = 450;
export const NOTES_PER_OCTAVE = 12;
export const ANGLE_PER_NOTE = 360 / NOTES_PER_OCTAVE;
export const STRIP_OCTAVES = 4;
export const STRIP_SLOTS = NOTES_PER_OCTAVE * STRIP_OCTAVES;
export const STRIP_CENTER = STRIP_SLOTS / 2;

export const transformTransition = (animating: boolean) =>
  animating ? `transform ${SPECTRUM_TRANSITION_MS}ms ease-out` : "none";

export const INACTIVE_BG_CLASS = "bg-neutral-700";
export const INACTIVE_FILL_VAR = "var(--color-neutral-700)";
export const HOVER_DIM_GROUP = "transition-opacity group-hover:opacity-60";
export const HOVER_DIM = "transition-opacity hover:opacity-60 focus-visible:opacity-60";
