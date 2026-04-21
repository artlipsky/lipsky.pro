import { ListBox, ListBoxItem, Select } from "@heroui/react";
import { notes } from "../data/notes";

interface Props {
  value: number;
  onChange: (index: number) => void;
}

const items = notes.map((note, index) => ({
  id: String(index),
  label: note,
}));

export default function TonicSelect({ value, onChange }: Props) {
  return (
    <Select
      className="w-full max-w-28 md:max-w-32 whitespace-nowrap"
      aria-label="Tonic"
      value={String(value)}
      onChange={(key) => onChange(Number(key))}
    >
      <Select.Trigger>
        <Select.Value className="truncate whitespace-nowrap" />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover className="max-h-80 no-scrollbar">
        <ListBox items={items}>
          {(item) => (
            <ListBoxItem id={item.id} textValue={item.label}>
              {item.label}
            </ListBoxItem>
          )}
        </ListBox>
      </Select.Popover>
    </Select>
  );
}
