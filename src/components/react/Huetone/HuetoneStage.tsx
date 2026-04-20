import { useState } from "react";
import { ListBox, ListBoxItem, Select } from "@heroui/react";
import { DEFAULT_SCALE_ID, scales } from "../../../data/scales";
import { SpectrumLine, SpectrumRing } from "../Spectrum";
import { useCarouselOffset } from "./useCarouselOffset";
import { useUrlSync } from "./useUrlSync";

interface Props {
  className?: string;
}

export default function HuetoneStage({ className }: Props) {
  const [scaleId, setScaleId] = useState(DEFAULT_SCALE_ID);
  const { offset, animating, handleWheel, shift, jumpTo } = useCarouselOffset();

  useUrlSync({ offset, scaleId, jumpTo, setScaleId });

  const scale = scales.find((s) => s.id === scaleId) ?? scales[0];
  const inScale = (i: number) => scale.degrees.includes(i);

  return (
    <section className={`flex flex-col items-center gap-8 w-full ${className ?? ""}`}>
      <Select className="w-full max-w-64 md:max-w-72" aria-label="Scale" value={scaleId} onChange={(key) => setScaleId(String(key))}>
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

      <div className="flex flex-col items-center gap-16 w-full">
        <SpectrumLine offset={offset} animating={animating} inScale={inScale} onShiftBy={shift} onWheel={handleWheel} className="max-w-5xl" />
        <SpectrumRing offset={offset} animating={animating} inScale={inScale} onShiftBy={shift} onWheel={handleWheel} />
      </div>
    </section>
  );
}
