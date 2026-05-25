import type { RefObject } from "react";

type DreamProps = {
  videoRef: RefObject<HTMLVideoElement | null>;
};

export function Dream({ videoRef }: DreamProps) {
  return (
    <>
      <div className="dream__video-layer" aria-hidden="true">
        <video
          ref={videoRef}
          className="dream__video"
          src="/videos/mainvideo.mp4"
          muted
          loop
          playsInline
          preload="metadata"
        />
        <div className="dream__video-wash" />
      </div>
      <div className="dream__inner">
        <div className="dream__words serif" aria-label="Mimpiku bukan hanya tentang kode.">
          <span className="dream__word">Mimpiku</span>
          <span className="dream__word">bukan hanya</span>
          <span className="dream__word">tentang kode.</span>
        </div>
        <div className="dream__lines">
          <p className="dream__text">Aku ingin bermain peran.</p>
          <p className="dream__text">Adegan romantis. Di panggung dunia.</p>
        </div>
        <p className="dream__heart serif">Ini aku. Ini hatiku.</p>
        <p className="dream__song">Shape of My Heart</p>
      </div>
    </>
  );
}
