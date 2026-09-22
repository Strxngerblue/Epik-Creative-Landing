import Reveal from "./Reveal";

export default function CreativePackages() {
  return (
    <section className="bg-black px-6 py-14 md:px-10 md:py-20 lg:px-20">
      <div className="mx-auto flex max-w-[1140px] flex-col gap-10">
        <Reveal className="flex flex-col gap-3">
          <p className="text-[13px] font-bold tracking-wide text-epik-text/95 uppercase">
            Paquetes Creative
          </p>
          <h2
            className="max-w-3xl font-bold text-epik-lime uppercase"
            style={{ fontSize: "clamp(2.5rem, 10vw, 128px)" }}
          >
            Contenido con estilo, estrategia y personalidad.
          </h2>
          <p className="max-w-2xl text-[15px] leading-relaxed text-epik-text">
            Desde crear tu presencia hasta amplificar tu alcance. Elige el
            paquete que mejor se adapte a lo que tu marca necesita hoy.
          </p>
        </Reveal>

        <Reveal
          delay={100}
          className="relative mx-auto aspect-[1135/444] w-full max-w-[1135px]"
        >
          <img
            src="/images/creative-packages.png"
            alt=""
            aria-hidden
            className="absolute top-[7.5%] left-[4.5%] aspect-[867/913] w-[33%] rounded-2xl object-cover shadow-xl transition-transform duration-300 ease-[var(--ease-out)] [@media(hover:hover)]:hover:-translate-y-1"
          />
          <img
            src="/images/creative-packages.png"
            alt=""
            aria-hidden
            className="absolute top-[7.5%] right-[4.5%] aspect-[867/913] w-[33%] rounded-2xl object-cover shadow-xl transition-transform duration-300 ease-[var(--ease-out)] [@media(hover:hover)]:hover:-translate-y-1"
          />
          <img
            src="/images/creative-packages.png"
            alt="Paquete Highlights: lo mejor del stream, fuera del stream"
            className="absolute top-0 left-1/2 aspect-[867/913] w-[37.5%] -translate-x-1/2 rounded-2xl object-cover shadow-2xl transition-transform duration-300 ease-[var(--ease-out)] [@media(hover:hover)]:hover:-translate-y-1"
          />
        </Reveal>
      </div>
    </section>
  );
}
