import type { Degree } from "./data/palettes";

export type Mode = "major" | "minor";

export interface ViewProps {
  spectrum: readonly Degree[];
  offset: number;
  animating: boolean;
  inScale?: (degreeIndex: number) => boolean;
  onShiftBy: (delta: number) => void;
  onWheel?: (e: WheelEvent) => void;
  label?: string;
  className?: string;
}
