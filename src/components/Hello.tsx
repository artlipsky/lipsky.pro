import { Button, Card } from "@heroui/react";

export default function Hello() {
  return (
    <Card className="max-w-md">
      <Card.Header>
        <Card.Title>lipsky.pro</Card.Title>
        <Card.Description>
          Astro + React + Tailwind v4 + Hero UI v3
        </Card.Description>
      </Card.Header>
      <Card.Content className="flex flex-row gap-2">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
      </Card.Content>
    </Card>
  );
}
