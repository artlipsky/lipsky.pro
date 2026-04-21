import type { Degree } from "../data/spectrum";
import { HOVER_DIM, INACTIVE_FILL_VAR } from "./types";

interface Props {
  step: Degree;
  path: string;
  active: boolean;
  strokeWidth: number;
  onClick: () => void;
}

export default function Wedge({ step, path, active, strokeWidth, onClick }: Props) {
  const fill = active ? `var(--color-${step.color}-500)` : INACTIVE_FILL_VAR;
  return (
    <path
      d={path}
      fill={fill}
      stroke={fill}
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
      strokeLinecap="round"
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`Set ${step.name} as tonic`}
      className={`focus:outline-none cursor-pointer ${HOVER_DIM}`}
    />
  );
}
