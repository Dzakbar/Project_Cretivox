import { SplitText } from "@/components/SplitText";

export function Hero() {
  return (
    <div className="hero__copy">
      <p className="hero__line hero__line--one">
        <SplitText text="Aku selalu dianggap sebelah mata" />
      </p>
      <p className="hero__line hero__line--two">
        <SplitText text="Dengan tatapan yang dingin" />
      </p>
      <h1 className="hero__title serif">JAKBAR</h1>
      <p className="hero__role">menulis layar, menyimpan panggung di dada</p>
      <p className="scroll-cue">scroll</p>
    </div>
  );
}
