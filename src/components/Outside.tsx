import Image from "next/image";

const memories = [
  {
    body: "Ada hari ketika aku keluar dari layar, datang sebagai volunteer, dan belajar cara hadir tanpa banyak bicara.",
    className: "outside-memory__frame--arrival",
    key: "arrival",
    src: "/images/optimized/gy3.webp",
    title: "aku datang untuk belajar hadir.",
  },
  {
    body: "Di sana, belajar bisa jadi permainan. Tawa mereka bikin suasana yang awalnya asing pelan-pelan jadi hangat.",
    className: "outside-memory__frame--play",
    key: "play",
    src: "/images/optimized/gy32.webp",
    title: "belajar, main, dan tertawa bersama.",
  },
  {
    body: "Aku pikir aku datang untuk menemani. Ternyata aku juga pulang dengan hati yang sedikit lebih ringan.",
    className: "outside-memory__frame--healing",
    key: "healing",
    src: "/images/optimized/gy33.webp",
    title: "healing itu kadang sesederhana ini.",
  },
  {
    body: "Di tempat yang jauh dari kebiasaan, aku belajar membuka mata, mendengar lebih pelan, dan menerima bahwa asing tidak selalu berarti menakutkan.",
    className: "outside-memory__frame--china-campus",
    key: "china-campus",
    src: "/images/optimized/china.webp",
    title: "untuk pertama kalinya, aku berani melangkah.",
  },
  {
    body: "Ada momen ketika aku sadar, berani bukan berarti tidak takut. Berani itu tetap maju, bahkan saat belum sepenuhnya siap.",
    className: "outside-memory__frame--china-certificate",
    key: "china-certificate",
    src: "/images/optimized/china2.webp",
    title: "ternyata aku bisa berdiri di sana.",
  },
  {
    body: "Dan di tempat sejauh itu, aku tidak cuma belajar hal baru. Aku juga membawa bagian dari rumahku sendiri.",
    className: "outside-memory__frame--china-stage",
    key: "china-stage",
    src: "/images/optimized/china3.webp",
    title: "aku pergi jauh, tapi tidak kehilangan arah.",
  },
  {
    body: "Lalu aku menemukan cara lain untuk bercerita: bukan lewat baris kode, tapi lewat cahaya, suara, dan tatapan kecil yang ditangkap kamera.",
    className: "outside-memory__frame--film-process",
    key: "film-process",
    src: "/images/optimized/film1.webp",
    title: "aku mulai melihat dunia seperti adegan.",
  },
  {
    body: "Di layar itu, aku belajar bahwa satu momen sederhana bisa menyimpan rasa yang panjang.",
    className: "outside-memory__frame--film-screen",
    key: "film-screen",
    src: "/images/optimized/film2.webp",
    title: "cerita kecil itu mulai hidup.",
  },
  {
    body: "Saat cerita itu berdiri di depan banyak orang, aku sadar: aku ingin membuat sesuatu yang bukan cuma berjalan, tapi tinggal.",
    className: "outside-memory__frame--film-stage",
    key: "film-stage",
    src: "/images/optimized/film3.webp",
    title: "mimpi terbesarku mulai punya bentuk.",
  },
];

export function Outside() {
  return (
    <div className="outside">
      <div className="outside-memory" aria-hidden="true">
        {memories.map((memory) => (
          <figure className={`outside-memory__frame ${memory.className}`} key={memory.src}>
            <Image
              alt=""
              fill
              loading="lazy"
              sizes="(max-width: 860px) 100vw, 62vw"
              src={memory.src}
            />
            <span className="outside-memory__wash" />
          </figure>
        ))}
        <div className="outside-film-letterbox" />
      </div>

      <div className="outside__copy">
        <p className="outside__eyebrow">di luar kode</p>
        <div className="outside__beats">
          {memories.map((memory, index) => (
            <div className={`outside__beat outside__beat--${memory.key}`} key={memory.key}>
              <span className="outside__number">{String(index + 1).padStart(2, "0")}</span>
              <h2 className="outside__title serif">{memory.title}</h2>
              <p className="outside__body">{memory.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
