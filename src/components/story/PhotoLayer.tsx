import Image from "next/image";

const photos = [
  {
    alt: "Jakbar menghadap kamera",
    className: "story-photo--front",
    src: "/images/optimized/photodepanfix.webp",
  },
  {
    alt: "Jakbar dari sisi kiri",
    className: "story-photo--left",
    src: "/images/optimized/photokirifix.webp",
  },
  {
    alt: "Jakbar dari sisi kanan",
    className: "story-photo--right",
    src: "/images/optimized/photokananfix.webp",
  },
];

export function PhotoLayer() {
  return (
    <div className="story-photos" aria-hidden="true">
      {photos.map((photo) => {
        const isHeroPhoto = photo.src.includes("depan");

        return (
          <div className={`story-photo ${photo.className}`} key={photo.src}>
            <Image
              alt={photo.alt}
              fill
              loading={isHeroPhoto ? "eager" : "lazy"}
              preload={isHeroPhoto}
              sizes="100vw"
              src={photo.src}
            />
          </div>
        );
      })}
      <div className="story-photo-vignette" />
    </div>
  );
}
