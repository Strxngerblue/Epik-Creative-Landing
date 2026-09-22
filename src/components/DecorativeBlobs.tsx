const BLOBS = [
  { top: "72%", left: "-8%", size: 420 },
  { top: "52%", left: "92%", size: 400 },
  { top: "93%", left: "84%", size: 220 },
  { top: "12%", left: "96%", size: 340 },
  { top: "30%", left: "0%", size: 380 },
];

export default function DecorativeBlobs() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 hidden overflow-hidden opacity-40 mix-blend-screen sm:block"
    >
      {BLOBS.map((blob, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-epik-lime blur-3xl"
          style={{
            top: blob.top,
            left: blob.left,
            width: blob.size,
            height: blob.size,
          }}
        />
      ))}
    </div>
  );
}
