import ScaleStage from "../primitives/ScaleStage";
import SpectrumLine from "./SpectrumLine";

interface Props {
  className?: string;
}

export default function SpectrumLineStage({ className }: Props) {
  return <ScaleStage view={SpectrumLine} gap="gap-8" viewClassName="max-w-5xl" className={className} />;
}
