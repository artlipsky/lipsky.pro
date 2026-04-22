interface Props {
  note: string;
}

export default function NoteLabel({ note }: Props) {
  return (
    <span className="font-mono font-bold text-white text-sm md:text-lg">
      <span className="md:hidden">{note.split("/")[0]}</span>
      <span className="hidden md:inline">{note}</span>
    </span>
  );
}
