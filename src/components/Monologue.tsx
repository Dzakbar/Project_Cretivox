import { SplitText } from "@/components/SplitText";

export function Monologue() {
  return (
    <div className="monologue__inner">
      <p className="monologue__line serif">
        <SplitText text="Ada satu hal yang belum pernah aku bilang." />
      </p>
      <p className="monologue__soon serif">Segera.</p>
    </div>
  );
}
