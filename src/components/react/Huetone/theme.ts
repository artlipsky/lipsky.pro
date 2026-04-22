export const SPECTRUM_TRANSITION_MS = 450;

export const transformTransition = (animating: boolean) =>
  animating ? `transform ${SPECTRUM_TRANSITION_MS}ms ease-out` : "none";

export const INACTIVE_BG_CLASS = "bg-neutral-700";
export const INACTIVE_FILL_VAR = "var(--color-neutral-700)";
export const HOVER_DIM_GROUP = "transition-opacity group-hover:opacity-60";
export const HOVER_DIM = "transition-opacity hover:opacity-60 focus-visible:opacity-60";
