import { PALETTE_OPTIONS, type PaletteId } from "../data/palettes";
import Dropdown, { type DropdownItem } from "./Dropdown";

interface Props {
  value: PaletteId;
  onChange: (value: PaletteId) => void;
}

const items: DropdownItem[] = PALETTE_OPTIONS.map((p) => ({ id: p.id, label: p.label }));

export default function PaletteSelect({ value, onChange }: Props) {
  return (
    <Dropdown
      items={items}
      value={value}
      onChange={(v) => onChange(v as PaletteId)}
      ariaLabel="Palette"
      maxWidth="max-w-40 md:max-w-48"
    />
  );
}
