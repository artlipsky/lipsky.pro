import { NOTES_PER_OCTAVE } from "../data/intervals";

export const ANGLE_PER_NOTE = 360 / NOTES_PER_OCTAVE;

const outerR = 170;
const innerR = 110;
const innerWedgeOuterR = 95;
const innerWedgeInnerR = 35;
const labelMargin = 40;

export const RING_CONFIG = {
  outerR,
  innerR,
  textR: (outerR + innerR) / 2,
  labelR: outerR + labelMargin,
  innerWedgeOuterR,
  innerWedgeInnerR,
  innerTextR: (innerWedgeOuterR + innerWedgeInnerR) / 2,
  viewBox: 400,
  uniformGap: 18,
  innerUniformGap: 12,
  cornerStroke: 14,
  innerCornerStroke: 8,
} as const;

export const RING_START_ANGLE = -90;

export const RING_VIEWBOX = `${-RING_CONFIG.viewBox / 2} ${-RING_CONFIG.viewBox / 2} ${RING_CONFIG.viewBox} ${RING_CONFIG.viewBox}`;

const BBOX_PRECISION = 5;
const UNIT_PRECISION = 2;

const degToRad = (d: number) => (d * Math.PI) / 180;

interface WedgePathOptions {
  bbox?: boolean;
  outerR?: number;
  innerR?: number;
  cornerStroke?: number;
  uniformGap?: number;
}

export const INNER_WEDGE_OPTIONS: WedgePathOptions = {
  outerR: RING_CONFIG.innerWedgeOuterR,
  innerR: RING_CONFIG.innerWedgeInnerR,
  cornerStroke: RING_CONFIG.innerCornerStroke,
  uniformGap: RING_CONFIG.innerUniformGap,
};

export function wedgePath(i: number, options: WedgePathOptions = {}): string {
  const {
    bbox = false,
    outerR: Ro0 = RING_CONFIG.outerR,
    innerR: Ri0 = RING_CONFIG.innerR,
    cornerStroke = RING_CONFIG.cornerStroke,
    uniformGap = RING_CONFIG.uniformGap,
  } = options;
  const expand = bbox ? cornerStroke / 2 : 0;
  const half = ANGLE_PER_NOTE / 2;
  const s = degToRad(RING_START_ANGLE - half + i * ANGLE_PER_NOTE);
  const e = degToRad(RING_START_ANGLE - half + (i + 1) * ANGLE_PER_NOTE);
  const Ro = Ro0 + expand;
  const Ri = Math.max(0, Ri0 - expand);
  const d = Math.max(0, uniformGap / 2 - expand);
  const tOuter = Math.sqrt(Ro * Ro - d * d);
  const tInner = Math.sqrt(Ri * Ri - d * d);

  const osX = tOuter * Math.cos(s) - d * Math.sin(s);
  const osY = tOuter * Math.sin(s) + d * Math.cos(s);
  const isX = tInner * Math.cos(s) - d * Math.sin(s);
  const isY = tInner * Math.sin(s) + d * Math.cos(s);
  const oeX = tOuter * Math.cos(e) + d * Math.sin(e);
  const oeY = tOuter * Math.sin(e) - d * Math.cos(e);
  const ieX = tInner * Math.cos(e) + d * Math.sin(e);
  const ieY = tInner * Math.sin(e) - d * Math.cos(e);

  const vb = RING_CONFIG.viewBox;
  const p = bbox
    ? (v: number) => (v / vb + 0.5).toFixed(BBOX_PRECISION)
    : (v: number) => v.toFixed(UNIT_PRECISION);
  const r = bbox ? (v: number) => (v / vb).toFixed(BBOX_PRECISION) : (v: number) => String(v);

  return [
    `M ${p(osX)} ${p(osY)}`,
    `A ${r(Ro)} ${r(Ro)} 0 0 1 ${p(oeX)} ${p(oeY)}`,
    `L ${p(ieX)} ${p(ieY)}`,
    `A ${r(Ri)} ${r(Ri)} 0 0 0 ${p(isX)} ${p(isY)}`,
    "Z",
  ].join(" ");
}

export const innerWedgePath = (i: number, extra: WedgePathOptions = {}): string =>
  wedgePath(i, { ...INNER_WEDGE_OPTIONS, ...extra });

export function polarPercent(angleDeg: number, radius: number) {
  const rad = degToRad(angleDeg);
  const x = 50 + (radius / RING_CONFIG.viewBox) * 100 * Math.cos(rad);
  const y = 50 + (radius / RING_CONFIG.viewBox) * 100 * Math.sin(rad);
  return { x, y };
}
