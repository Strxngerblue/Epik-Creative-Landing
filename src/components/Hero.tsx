import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[85vh] items-end justify-center overflow-hidden px-6 pb-16 sm:min-h-[90vh] md:pb-20 lg:min-h-screen"
    >
      <div aria-hidden className="absolute inset-0">
        <img
          src="/images/hero-bg.png"
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />
      </div>

      <Reveal
        as="p"
        className="pointer-events-none absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 px-4 text-center font-bold text-[clamp(3.5rem,16vw,12.5rem)] leading-[1.1] tracking-tight text-epik-lime uppercase [text-shadow:0_4px_4px_rgba(0,0,0,0.25)]"
      >
        Imagina
      </Reveal>

      <Reveal
        delay={150}
        className="relative z-10 flex flex-col items-center gap-4 text-center sm:gap-5"
      >
        <p className="max-w-xl text-2xl leading-[1.1] font-bold text-epik-text sm:text-3xl md:text-4xl">
          ¿Listo para hacer posible lo que imaginas?
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#contacto"
            className="press rounded-full bg-epik-lime px-6 py-3.5 text-[15px] font-bold text-black transition-opacity hover:opacity-85"
          >
            Hablemos
          </a>
          <a
            href="#servicios"
            className="press rounded-full border border-[#d1d1d6] px-6 py-3.5 text-[15px] font-bold text-[#d1d1d6] transition-colors hover:border-epik-text hover:text-epik-text"
          >
            Ver Servicios
          </a>
        </div>
      </Reveal>
    </section>
  );
}
