import { ListBox, ListBoxItem, Select } from "@heroui/react";
import { scales } from "../data/scales";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function ScaleSelect({ value, onChange }: Props) {
  return (
    <Select
      className="w-full max-w-60 md:max-w-72 whitespace-nowrap"
      aria-label="Scale"
      value={value}
      onChange={(key) => onChange(String(key))}
    >
      <Select.Trigger>
        <Select.Value className="truncate whitespace-nowrap" />
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
  );
}
