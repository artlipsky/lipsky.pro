import ViewLabel from "./ViewLabel";

interface Props {
  children: string;
}

export default function RingCenterLabel({ children }: Props) {
  return (
    <div className="absolute inset-0 flex justify-center items-center px-8 pointer-events-none">
      <ViewLabel>{children}</ViewLabel>
    </div>
  );
}
