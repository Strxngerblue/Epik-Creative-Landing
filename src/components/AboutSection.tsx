import Reveal from "./Reveal";

export default function AboutSection() {
  return (
    <section
      id="quienes-somos"
      className="bg-black px-6 py-14 md:px-10 md:py-20 lg:px-20"
    >
      <div className="mx-auto flex max-w-[1140px] flex-col gap-10">
        <Reveal className="flex flex-col gap-3">
          <p
            className="whitespace-normal font-bold tracking-wide text-epik-text/95 uppercase xl:whitespace-nowrap"
            style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)" }}
          >
            ¿Quiénes estamos detrás de Epik?
          </p>
          <h2
            className="whitespace-normal font-bold leading-[0.95] text-epik-lime uppercase xl:whitespace-nowrap"
            style={{ fontSize: "clamp(2.5rem, 8vw, 96px)" }}
          >
            Dos Mentes, Una Visión
          </h2>
          <p className="text-base leading-relaxed text-epik-text">
            Epik nace de dos mentes, dos formas de crear con una misma
            visión. Creamos Epik porque creemos que no debería existir
            <br />
            una barrera entre imaginar algo increíble y hacerlo realidad.
          </p>
        </Reveal>

        <Reveal
          delay={100}
          className="flex flex-col items-center gap-10 md:flex-row md:items-center md:justify-center md:gap-8"
        >
          <div className="flex aspect-square w-full max-w-[300px] flex-col items-center justify-center rounded-[24px] border border-epik-lime/40 bg-epik-lime/10 transition-colors duration-200 [@media(hover:hover)]:hover:border-epik-lime/70">
            <p className="text-xl font-bold text-epik-lime">Hola! soy Blue.</p>
          </div>

          <div className="flex w-full max-w-[300px] flex-col items-center gap-3">
            <div className="flex aspect-square w-full flex-col items-center justify-center rounded-[24px] border border-epik-lime/40 bg-epik-lime/10 transition-colors duration-200 [@media(hover:hover)]:hover:border-epik-lime/70">
              <p className="text-xl font-bold text-epik-lime">
                Hola! soy Kuro.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={150} className="flex flex-col items-center gap-8 text-center">
          <p className="text-2xl leading-tight font-bold text-epik-lime uppercase sm:text-3xl md:text-4xl">
            Tú pones la idea. Nosotros la hacemos EPIK.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
