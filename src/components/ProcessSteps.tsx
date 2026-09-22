import Reveal from "./Reveal";

const STEPS = [
  "Reunión y diagnóstico",
  "Brief y Preparación",
  "Planificamos el contenido",
  "Creamos y producimos",
  "Publicamos y amplificamos",
  "Medimos y optimizamos",
];

export default function ProcessSteps() {
  return (
    <section
      id="proceso"
      className="bg-black px-6 py-14 md:px-10 md:py-20 lg:px-20"
    >
      <div className="mx-auto flex max-w-[1140px] flex-col gap-10">
        <Reveal className="flex flex-col gap-3">
          <p className="text-[13px] font-bold tracking-wide text-[#8e8e93] uppercase">
            Cómo Funciona
          </p>
          <h2 className="text-3xl font-bold text-epik-lime uppercase sm:text-4xl">
            Nuestro Proceso
          </h2>
          <p className="max-w-2xl text-base text-epik-text">
            Un camino claro para convertir tu idea en una marca que se ve, se
            siente y conecta.
          </p>
        </Reveal>

        {/* Mobile / tablet: vertical timeline */}
        <ol className="flex flex-col gap-8 lg:hidden">
          {STEPS.map((step, i) => (
            <Reveal as="li" key={step} delay={i * 60} className="relative flex items-start gap-5 pl-1">
              {i < STEPS.length - 1 && (
                <span className="absolute top-10 left-[19px] h-[calc(100%+8px)] w-0 border-l-2 border-dashed border-white/40" />
              )}
              <span
                className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-white/70 ${
                  i === 0 ? "bg-epik-lime" : "bg-[#8e8e93]"
                }`}
              />
              <p className="pt-2 text-base font-bold text-epik-lime">
                {step}
              </p>
            </Reveal>
          ))}
        </ol>

        {/* Desktop: horizontal timeline */}
        <ol className="relative hidden items-start justify-between lg:flex">
          <span className="absolute top-10 right-10 left-10 h-0 border-t-2 border-dashed border-white/40" />
          {STEPS.map((step, i) => (
            <Reveal
              as="li"
              key={step}
              delay={i * 60}
              className="relative z-10 flex w-[150px] flex-col items-center gap-4"
            >
              <span
                className={`h-20 w-20 shrink-0 rounded-full border-2 border-white/70 ${
                  i === 0 ? "bg-epik-lime" : "bg-[#8e8e93]"
                }`}
              />
              <p className="text-center text-base font-bold text-epik-lime">
                {step}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
