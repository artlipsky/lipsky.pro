import type { ReactNode } from "react";
import { useNonPassiveWheel } from "./useNonPassiveWheel";

interface Props {
  onWheel?: (e: WheelEvent) => void;
  className?: string;
  children: ReactNode;
}

export default function WheelArea({ onWheel, className, children }: Props) {
  const ref = useNonPassiveWheel<HTMLDivElement>(onWheel);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
