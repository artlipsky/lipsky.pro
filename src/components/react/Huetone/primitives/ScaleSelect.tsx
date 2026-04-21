import { scales } from "../data/scales";
import Dropdown, { type DropdownItem } from "./Dropdown";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const items: DropdownItem[] = scales.map((s) => ({ id: s.id, label: s.name }));

export default function ScaleSelect({ value, onChange }: Props) {
  return (
    <Dropdown
      items={items}
      value={value}
      onChange={onChange}
      ariaLabel="Scale"
      maxWidth="max-w-60 md:max-w-72"
    />
  );
}
