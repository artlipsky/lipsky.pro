import ScaleStage from "../ui/ScaleStage";
import SpectrumRing from "./SpectrumRing";

interface Props {
  className?: string;
}

export default function SpectrumRingStage({ className }: Props) {
  return <ScaleStage view={SpectrumRing} gap="gap-16" className={className} />;
}
