import Reveal from "./Reveal";
import SwitchScroll, { type SwitchScrollCard } from "./SwitchScroll";

const STREAM_CARDS: SwitchScrollCard[] = [
  {
    id: "overlays",
    eyebrow: "OVERLAYS EN VIVO",
    title: "Overlays que se ven profesionales.",
    subtitle:
      "Diseñamos la identidad visual que envuelve cada transmisión, lista para usar desde el primer stream.",
    image: "/images/streams-bevel.png",
    imagePosition: "center 30%",
  },
  {
    id: "branding",
    eyebrow: "BRANDING",
    title: "Tu marca en cada pantalla.",
    subtitle:
      "Colores, tipografías y elementos gráficos consistentes con tu identidad, en todo lo que transmites.",
  },
  {
    id: "highlights",
    eyebrow: "HIGHLIGHTS",
    title: "Lo mejor de tu stream, resumido.",
    subtitle:
      "Convertimos tus momentos más fuertes en clips listos para redes, sin esfuerzo extra de tu parte.",
  },
];

export default function StreamsPackages() {
  return (
    <section
      id="paquetes"
      className="bg-black px-6 py-14 md:px-10 md:py-20 lg:px-20"
    >
      <div className="mx-auto flex max-w-[1140px] flex-col gap-10">
        <Reveal className="flex flex-col gap-3">
          <p
            className="font-bold tracking-wide text-epik-text/95 uppercase"
            style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)" }}
          >
            Packs Streams
          </p>
          <h2
            className="max-w-3xl font-bold leading-[0.95] text-epik-lime uppercase"
            style={{ fontSize: "clamp(2.5rem, 8vw, 96px)" }}
          >
            Dale identidad propia a tu contenido en vivo.
          </h2>
          <p className="max-w-4xl text-[15px] leading-relaxed text-epik-text">
            Overlays, branding, highlights y más. Todo lo que necesitas para
            que tu stream se sienta profesional y reconocible.
          </p>
        </Reveal>

        <SwitchScroll cards={STREAM_CARDS} maxWidth={1140} scrollStep={0.35} />
      </div>
    </section>
  );
}
