import { ListBox, ListBoxItem, Select } from "@heroui/react";

export interface DropdownItem {
  id: string;
  label: string;
}

interface Props {
  items: readonly DropdownItem[];
  value: string;
  onChange: (value: string) => void;
  ariaLabel: string;
  maxWidth?: string;
}

export default function Dropdown({
  items,
  value,
  onChange,
  ariaLabel,
  maxWidth = "max-w-60 md:max-w-72",
}: Props) {
  return (
    <Select
      className={`w-full ${maxWidth} whitespace-nowrap`}
      aria-label={ariaLabel}
      value={value}
      onChange={(key) => onChange(String(key))}
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
