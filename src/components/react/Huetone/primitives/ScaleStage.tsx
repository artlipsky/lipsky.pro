import type { ComponentType } from "react";
import { mod } from "../../../../math/mod";
import ScaleSelect from "./ScaleSelect";
import TonicSelect from "./TonicSelect";
import { NOTES_PER_OCTAVE, type ViewProps } from "./types";
import { useCarouselOffset } from "./useCarouselOffset";
import { useScale } from "./useScale";

interface Props {
  view: ComponentType<ViewProps>;
  gap: string;
  viewClassName?: string;
  className?: string;
}

export default function ScaleStage({ view: View, gap, viewClassName, className }: Props) {
  const { scaleId, setScaleId, scale, inScale } = useScale();
  const { offset, animating, handleWheel, shift, jumpTo } = useCarouselOffset();
  const tonicIndex = mod(offset, NOTES_PER_OCTAVE);

  return (
    <section className={`flex flex-col items-center ${gap} w-full ${className ?? ""}`}>
      <div className="flex items-center gap-2">
        <TonicSelect value={tonicIndex} onChange={jumpTo} />
        <ScaleSelect value={scaleId} onChange={setScaleId} />
      </div>
      <View
        offset={offset}
        animating={animating}
        inScale={inScale}
        onShiftBy={shift}
        onWheel={handleWheel}
        label={scale.name}
        className={viewClassName}
      />
    </section>
  );
}
