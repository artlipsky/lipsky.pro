import { useEffect, useRef, useState } from "react";
import { ListBox, ListBoxItem, Select } from "@heroui/react";
import { spectrum } from "../data/spectrum";
import { notes, flatNotes } from "../data/notes";
import { scales } from "../data/scales";
import { useCarouselOffset } from "../hooks/useCarouselOffset";

interface Props {
  className?: string;
}

const CONFIG = {
  stripSlots: 48,
  transitionMs: 450,
  wheelMinInterval: 80,
  normalizeDelay: 300,
} as const;

const STRIP_CENTER = CONFIG.stripSlots / 2;

export default function Spectrum({ className }: Props) {
  const [scaleId, setScaleId] = useState("chromatic");
  const { offset, animating, sectionRef, shift, jumpTo } = useCarouselOffset({
    wheelMinInterval: CONFIG.wheelMinInterval,
    normalizeDelay: CONFIG.normalizeDelay,
  });
  const syncedFromUrlRef = useRef(false);

  const scale = scales.find((s) => s.id === scaleId) ?? scales[0];

  useEffect(() => {
    if (syncedFromUrlRef.current) return;
    syncedFromUrlRef.current = true;
    const params = new URLSearchParams(window.location.search);
    const tonic = params.get("tonic");
    const scaleParam = params.get("scale");
    if (tonic) {
      const idx = flatNotes.indexOf(tonic);
      if (idx > 0) jumpTo(idx);
    }
    if (scaleParam && scales.some((s) => s.id === scaleParam)) {
      setScaleId(scaleParam);
    }
  }, [jumpTo]);

  useEffect(() => {
    if (!syncedFromUrlRef.current) return;
    const timer = window.setTimeout(() => {
      const tonicIdx = ((offset % 12) + 12) % 12;
      const tonic = flatNotes[tonicIdx];
      const params = new URLSearchParams();
      if (tonic !== flatNotes[0]) params.set("tonic", tonic);
      if (scaleId !== "chromatic") params.set("scale", scaleId);
      const query = params.toString();
      const url = query
        ? `${window.location.pathname}?${query}`
        : window.location.pathname;
      window.history.replaceState(null, "", url);
    }, 400);
    return () => window.clearTimeout(timer);
  }, [offset, scaleId]);

  return (
    <section
      ref={sectionRef}
      className={
        className
          ? `flex flex-col gap-6 w-full ${className}`
          : "flex flex-col gap-6 w-full"
      }
    >
      <div className="flex justify-center">
        <Select
          className="w-full max-w-64 md:max-w-72"
          aria-label="Scale"
          selectedKey={scaleId}
          onSelectionChange={(key) => setScaleId(String(key))}
        >
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover className="max-h-80 no-scrollbar">
            <ListBox items={scales}>
              {(item) => (
                <ListBoxItem id={item.id} textValue={item.name}>
                  {item.name}
                </ListBoxItem>
              )}
            </ListBox>
          </Select.Popover>
        </Select>
      </div>

      <div className="grid grid-cols-12 gap-1 select-none">
        {spectrum.map((step, i) => {
          const inScale = scale.degrees.includes(i);
          const bgClass = inScale ? step.bg : "bg-neutral-700";
          const currentNote =
            notes[(((offset + i) % 12) + 12) % 12];
          const stripNotes = Array.from(
            { length: CONFIG.stripSlots },
            (_, idx) =>
              notes[(((i + idx - STRIP_CENTER) % 12) + 12) % 12],
          );
          return (
            <button
              key={step.degree}
              type="button"
              onClick={() => shift(i)}
              aria-label={`Set ${currentNote} (${step.name}) as tonic`}
              className="flex flex-col items-center gap-2 text-center cursor-pointer group min-w-0"
            >
              <div
                className={`${bgClass} flex items-center rounded-md w-full h-16 md:h-20 transition-transform group-hover:scale-105 overflow-hidden`}
              >
                <div
                  className="flex items-center h-full shrink-0"
                  style={{
                    width: `${CONFIG.stripSlots * 100}%`,
                    transform: `translateX(-${((offset + STRIP_CENTER) * 100) / CONFIG.stripSlots}%)`,
                    transition: animating
                      ? `transform ${CONFIG.transitionMs}ms ease-out`
                      : "none",
                  }}
                >
                  {stripNotes.map((note, idx) => (
                    <div
                      key={idx}
                      className="flex justify-center items-center h-full shrink-0"
                      style={{ width: `${100 / CONFIG.stripSlots}%` }}
                    >
                      <span className="font-mono font-bold text-white text-sm md:text-lg">
                        <span className="md:hidden">{note.split("/")[0]}</span>
                        <span className="hidden md:inline">{note}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <span className="font-mono font-medium text-xs md:text-sm">
                {step.degree}
              </span>
              <span className="hidden md:block text-muted text-xs text-balance leading-tight md:min-h-10">
                {step.name}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
