import type { Mode } from "../types";
import Dropdown, { type DropdownItem } from "./Dropdown";

interface Props {
  value: Mode;
  onChange: (mode: Mode) => void;
}

const items: DropdownItem[] = [
  { id: "major", label: "Major" },
  { id: "minor", label: "Minor" },
];

export default function ModeSelect({ value, onChange }: Props) {
  return (
    <Dropdown
      items={items}
      value={value}
      onChange={(v) => onChange(v as Mode)}
      ariaLabel="Mode"
      maxWidth="max-w-28 md:max-w-32"
    />
  );
}
