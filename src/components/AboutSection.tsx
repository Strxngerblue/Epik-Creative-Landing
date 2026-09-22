import Reveal from "./Reveal";

export default function AboutSection() {
  return (
    <section
      id="quienes-somos"
      className="bg-black px-6 py-14 md:px-10 md:py-20 lg:px-20"
    >
      <div className="mx-auto flex max-w-[1140px] flex-col gap-10">
        <Reveal className="flex max-w-2xl flex-col gap-3">
          <p className="text-[13px] font-bold tracking-wide text-epik-text/95 uppercase">
            ¿Quiénes estamos detrás de Epik?
          </p>
          <h2 className="text-3xl font-bold text-epik-lime uppercase sm:text-4xl">
            Dos Mentes, Una Visión
          </h2>
          <p className="text-base leading-relaxed text-epik-text">
            Epik nace de dos mentes, dos formas de crear con una misma
            visión.
            <br />
            <br />
            Creamos Epik porque creemos que no debería existir una barrera
            entre imaginar algo increíble y hacerlo realidad.
          </p>
        </Reveal>

        <Reveal
          delay={100}
          className="flex flex-col items-center gap-10 md:flex-row md:items-center md:justify-center md:gap-8"
        >
          <div className="flex aspect-square w-full max-w-[300px] flex-col items-center justify-center rounded-[24px] border border-epik-blue/40 bg-epik-blue/10 transition-colors duration-200 [@media(hover:hover)]:hover:border-epik-blue/70">
            <p className="text-xl font-bold text-epik-blue">Hola! soy Blue.</p>
          </div>

          <p className="max-w-[220px] text-center text-2xl leading-snug text-epik-text">
            Una idea puede{" "}
            <span className="text-epik-lime">convertirse en</span> una marca.
          </p>

          <div className="flex w-full max-w-[300px] flex-col items-center gap-3">
            <div className="flex aspect-square w-full flex-col items-center justify-center rounded-[24px] border border-epik-orange/40 bg-epik-orange/10 transition-colors duration-200 [@media(hover:hover)]:hover:border-epik-orange/70">
              <p className="text-xl font-bold text-epik-orange">
                Hola! soy Kuro.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={150} className="flex flex-col items-center gap-8 text-center">
          <p className="max-w-4xl text-base leading-relaxed text-epik-text">
            Creamos Epik para poner todo lo que sabemos hacer al alcance de
            marcas, empresas, creadores y personas con algo que quieren
            construir. Porque muchas veces lo único que falta para hacer algo
            increíble es alguien que vea el potencial de tu idea y se atreva a
            llevarla más allá.
          </p>
          <p className="max-w-2xl text-2xl leading-tight font-bold text-epik-lime uppercase sm:text-3xl md:text-4xl">
            Tú pones la idea. Nosotros la hacemos EPIK.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
