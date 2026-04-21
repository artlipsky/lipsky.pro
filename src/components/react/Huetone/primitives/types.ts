export type Mode = "major" | "minor";

export interface ViewProps {
  offset: number;
  animating: boolean;
  inScale?: (degreeIndex: number) => boolean;
  onShiftBy: (delta: number) => void;
  onWheel?: (e: WheelEvent) => void;
  label?: string;
  className?: string;
}

export const SPECTRUM_TRANSITION_MS = 450;
export const NOTES_PER_OCTAVE = 12;
export const ANGLE_PER_NOTE = 360 / NOTES_PER_OCTAVE;

export const transformTransition = (animating: boolean) =>
  animating ? `transform ${SPECTRUM_TRANSITION_MS}ms ease-out` : "none";

export const INACTIVE_BG_CLASS = "bg-neutral-700";
export const INACTIVE_FILL_VAR = "var(--color-neutral-700)";
export const HOVER_DIM_GROUP = "transition-opacity group-hover:opacity-60";
export const HOVER_DIM = "transition-opacity hover:opacity-60 focus-visible:opacity-60";
