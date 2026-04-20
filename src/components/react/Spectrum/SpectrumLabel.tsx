interface Props {
  children: string;
}

export default function SpectrumLabel({ children }: Props) {
  return (
    <span className="font-medium text-xl md:text-2xl text-balance text-center">
      {children}
    </span>
  );
}
