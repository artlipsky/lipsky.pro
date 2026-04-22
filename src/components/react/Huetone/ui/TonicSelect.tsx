import { notes } from "../data/notes";
import Dropdown, { type DropdownItem } from "./Dropdown";

interface Props {
  value: number;
  onChange: (index: number) => void;
}

const items: DropdownItem[] = notes.map((note, index) => ({
  id: String(index),
  label: note,
}));

export default function TonicSelect({ value, onChange }: Props) {
  return (
    <Dropdown
      items={items}
      value={String(value)}
      onChange={(v) => onChange(Number(v))}
      ariaLabel="Tonic"
      maxWidth="max-w-28 md:max-w-32"
    />
  );
}
