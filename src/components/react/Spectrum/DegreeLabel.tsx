interface Props {
  degree: string;
  name: string;
}

export default function DegreeLabel({ degree, name }: Props) {
  return (
    <div className="flex flex-col items-center gap-1 text-center">
      <span className="font-mono font-medium text-xs md:text-sm">{degree}</span>
      <span className="hidden md:block md:min-h-10 text-muted text-xs text-balance leading-tight">{name}</span>
    </div>
  );
}
