interface Props {
  names: readonly string[];
  rotation: number;
  durationMs: number;
  onSegmentClick?: (index: number) => void;
  removingIndex?: number | null;
  fadeMs?: number;
}

const FADE_COLOR = "hsl(0 0% 35%)";

const segmentColor = (i: number, count: number) =>
  `hsl(${(i * 360) / count} 65% 58%)`;

const toXY = (angleDeg: number, r: number) => {
  const rad = (angleDeg * Math.PI) / 180;
  return [r * Math.sin(rad), -r * Math.cos(rad)] as const;
};

export default function Wheel({
  names,
  rotation,
  durationMs,
  onSegmentClick,
  removingIndex = null,
  fadeMs = 500,
}: Props) {
  const segCount = names.length;
  const segAngle = 360 / segCount;
  const clickable = Boolean(onSegmentClick) && segCount > 1;

  return (
    <div className="relative aspect-square w-full max-w-[28rem]">
      <svg
        viewBox="-1.08 -1.08 2.16 2.16"
        className="w-full h-full drop-shadow-2xl"
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: `transform ${durationMs}ms cubic-bezier(0.17, 0.67, 0.12, 0.99)`,
        }}
      >
        <circle r="1.04" fill="rgba(255,255,255,0.08)" />
        {names.map((name, i) => {
          const a1 = i * segAngle;
          const a2 = (i + 1) * segAngle;
          const mid = a1 + segAngle / 2;
          const [x1, y1] = toXY(a1, 1);
          const [x2, y2] = toXY(a2, 1);
          const largeArc = segAngle > 180 ? 1 : 0;
          const d =
            segCount === 1
              ? "M 0 -1 A 1 1 0 1 1 0 1 A 1 1 0 1 1 0 -1 Z"
              : `M 0 0 L ${x1} ${y1} A 1 1 0 ${largeArc} 1 ${x2} ${y2} Z`;
          const [tx, ty] = segCount === 1 ? ([0, 0] as const) : toXY(mid, 0.6);
          const flip = mid > 90 && mid < 270;
          const textRotation = segCount === 1 ? 0 : flip ? mid + 90 : mid - 90;
          const removing = removingIndex === i;
          return (
            <g
              key={name}
              onClick={clickable && !removing ? () => onSegmentClick?.(i) : undefined}
              style={{
                cursor: clickable && !removing ? "pointer" : "default",
                pointerEvents: removing ? "none" : undefined,
                opacity: removing ? 0 : 1,
                transition: removing ? `opacity ${fadeMs}ms ease-in` : undefined,
              }}
              className={clickable && !removing ? "group" : undefined}
            >
              <path
                d={d}
                fill={removing ? FADE_COLOR : segmentColor(i, segCount)}
                stroke="rgba(0,0,0,0.25)"
                strokeWidth="0.008"
                style={{ transition: removing ? "fill 180ms ease" : undefined }}
                className={clickable && !removing ? "transition-opacity group-hover:opacity-70" : undefined}
              />
              <text
                x={tx}
                y={ty}
                fontSize="0.11"
                fill="white"
                textAnchor="middle"
                dominantBaseline="middle"
                transform={`rotate(${textRotation} ${tx} ${ty})`}
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  userSelect: "none",
                  paintOrder: "stroke",
                  stroke: "rgba(0,0,0,0.35)",
                  strokeWidth: "0.012",
                }}
              >
                {name}
              </text>
            </g>
          );
        })}
        {segCount > 1 && (
          <circle r="0.09" fill="white" stroke="rgba(0,0,0,0.2)" strokeWidth="0.008" />
        )}
      </svg>

      <div className="-top-2 left-1/2 absolute -translate-x-1/2 drop-shadow-lg pointer-events-none">
        <svg width="36" height="44" viewBox="0 0 36 44">
          <path
            d="M 5 2 L 31 2 A 3 3 0 0 1 32.93 4.80 L 19.07 41.20 A 3 3 0 0 1 16.93 41.20 L 3.07 4.80 A 3 3 0 0 1 5 2 Z"
            fill="white"
            stroke="rgba(0,0,0,0.3)"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
