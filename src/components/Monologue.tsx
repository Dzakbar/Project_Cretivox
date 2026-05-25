import { SplitText } from "@/components/SplitText";

export function Monologue() {
  return (
    <div className="monologue__inner">
      <p className="monologue__line serif">
        <SplitText text="Ada hal yang ingin kusampaikan." />
      </p>
      <p className="monologue__soon serif">Sampai bertemu di Talent Day.</p>
    </div>
  );
}
