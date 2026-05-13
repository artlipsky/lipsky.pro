import { Button } from "@heroui/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { NAMES } from "./names";
import Wheel from "./Wheel";

const SPIN_DURATION_MS = 5000;
const MIN_EXTRA_TURNS = 5;
const FADE_HOLD_MS = 500;

export default function SpinnerStage() {
  const [names, setNames] = useState<string[]>(() => [...NAMES]);
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [removingIndex, setRemovingIndex] = useState<number | null>(null);
  const spinTimerRef = useRef<number | null>(null);
  const removeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (spinTimerRef.current !== null) window.clearTimeout(spinTimerRef.current);
      if (removeTimerRef.current !== null) window.clearTimeout(removeTimerRef.current);
    };
  }, []);

  const busy = spinning || removingIndex !== null;

  const spin = useCallback(() => {
    if (busy || names.length === 0) return;

    const segCount = names.length;
    const segAngle = 360 / segCount;
    const targetIndex = Math.floor(Math.random() * segCount);
    const jitter = (Math.random() - 0.5) * segAngle * 0.7;
    const targetMod = (360 - (targetIndex * segAngle + segAngle / 2) + jitter + 360) % 360;
    const currentMod = ((rotation % 360) + 360) % 360;
    const delta = (targetMod - currentMod + 360) % 360;

    setSpinning(true);
    setRotation(rotation + MIN_EXTRA_TURNS * 360 + delta);

    if (spinTimerRef.current !== null) window.clearTimeout(spinTimerRef.current);
    spinTimerRef.current = window.setTimeout(() => {
      setSpinning(false);
      spinTimerRef.current = null;
    }, SPIN_DURATION_MS + 50);
  }, [busy, rotation, names.length]);

  const handleRemove = useCallback(
    (index: number) => {
      if (busy || names.length <= 1) return;
      setRemovingIndex(index);
      if (removeTimerRef.current !== null) window.clearTimeout(removeTimerRef.current);
      removeTimerRef.current = window.setTimeout(() => {
        setNames((prev) => prev.filter((_, i) => i !== index));
        setRemovingIndex(null);
        removeTimerRef.current = null;
      }, FADE_HOLD_MS);
    },
    [busy, names.length],
  );

  return (
    <section className="flex flex-col items-center gap-12 w-full">
      <Wheel
        names={names}
        rotation={rotation}
        durationMs={SPIN_DURATION_MS}
        onSegmentClick={busy ? undefined : handleRemove}
        removingIndex={removingIndex}
        fadeMs={FADE_HOLD_MS}
      />
      <Button onPress={spin} onClick={spin} isDisabled={busy} size="lg" variant="outline">
        Spin the Wheel
      </Button>
    </section>
  );
}
