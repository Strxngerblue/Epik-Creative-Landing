import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";

// Ported from github.com/iKhunsa/epik-bizz-landing (ProcessSection),
// recolored for our dark theme: star-shaped step badges (masked with
// step-shape.svg) that fill lime as the section scrolls past, and a
// matching animated progress line, on the site's black background.
const PROCESS_LIME = "#baff19";
const PROCESS_TRACK = "#8e8e93";
const PROCESS_INK = "#0b0b0b";
const PROCESS_TEXT = "#f2f2f2";
const PROCESS_MUTED = "rgba(242,242,242,0.7)";

const STEPS = [
  {
    num: "01",
    title: "Reunión y diagnóstico",
    desc: "Nos reunimos para conocer tu marca, entender tus objetivos, audiencia y desafíos, competencia, para entender lo que necesita tu marca.",
  },
  {
    num: "02",
    title: "Brief y Preparación",
    desc: "Nos compartes la información, materiales, referencias y permisos necesarios de tu marca para tener todo listo antes de comenzar.",
  },
  {
    num: "03",
    title: "Planificamos el contenido",
    desc: "Organizamos ideas, formatos y mensajes en un plan de contenido alineado con la estrategia y los objetivos de tu marca.",
  },
  {
    num: "04",
    title: "Creamos y producimos",
    desc: "Ejecutamos la producción y transformamos la estrategia en contenido profesional diseñado para captar atención y generar conexión.",
  },
  {
    num: "05",
    title: "Publicamos y amplificamos",
    desc: "Optimizamos y distribuimos el contenido en los canales adecuados, poniendo tu marca frente a la audiencia correcta.",
  },
  {
    num: "06",
    title: "Medimos y optimizamos",
    desc: "Analizamos resultados, detectamos oportunidades y ajustamos la estrategia para mejorar continuamente el impacto de tu marca.",
  },
];

/** rAF-throttled scroll/resize listener. */
function useRafScroll(cb: () => void) {
  useEffect(() => {
    let ticking = false;
    const run = () => {
      ticking = false;
      cb();
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(run);
    };
    cb();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export default function ProcessSteps() {
  const [activeStep, setActiveStep] = useState(0);
  const gridRef = useRef<HTMLOListElement>(null);

  useRafScroll(() => {
    const el = gridRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const total = vh + rect.height;
    const progress =
      total > 0 ? Math.min(Math.max((vh - rect.top) / total, 0), 1) : 0;
    setActiveStep(Math.max(1, Math.ceil(progress * STEPS.length)));
  });

  const fillRatio = (activeStep - 1) / (STEPS.length - 1);

  return (
    <section id="proceso" className="bg-black py-14 md:py-20">
      <div className="mx-auto w-full max-w-[1180px] px-4 sm:px-5 lg:px-8">
        <Reveal className="mb-14 text-center">
          <h2
            className="font-bold uppercase tracking-tight"
            style={{ color: PROCESS_TEXT, fontSize: "clamp(1.5rem, 4vw, 2.5rem)" }}
          >
            Un proceso simple
            <span
              className="mt-2 block leading-[0.95]"
              style={{ color: PROCESS_LIME, fontSize: "clamp(2.5rem, 8vw, 96px)" }}
            >
              de principio a fin
            </span>
          </h2>
        </Reveal>

        <ol
          ref={gridRef}
          className="relative grid list-none grid-cols-1 gap-10 p-0 sm:grid-cols-3 sm:gap-6 lg:grid-cols-6 lg:gap-4"
        >
          <div
            aria-hidden
            className="absolute top-[37px] left-[8.33%] right-[8.33%] z-0 hidden h-1 lg:block"
            style={{ backgroundColor: PROCESS_TRACK }}
          />
          <div
            aria-hidden
            className="absolute top-[37px] left-[8.33%] z-0 hidden h-1 origin-left lg:block"
            style={{
              width: "83.33%",
              backgroundColor: PROCESS_LIME,
              transform: `scaleX(${fillRatio})`,
              transition: "transform 400ms var(--ease-out)",
            }}
          />
          {STEPS.map((step, i) => (
            <Reveal
              as="li"
              key={step.num}
              delay={i * 60}
              className="group relative z-10 flex flex-col items-center text-center"
            >
              <span
                className="relative flex h-[78px] w-[92px] items-center justify-center text-2xl font-bold"
                style={{ color: PROCESS_INK }}
              >
                <span
                  aria-hidden
                  className="absolute inset-0 z-0"
                  style={{
                    backgroundColor: i < activeStep ? PROCESS_LIME : PROCESS_TRACK,
                    transition: "background-color 300ms var(--ease-out)",
                    WebkitMaskImage: "url('/images/step-shape.svg')",
                    maskImage: "url('/images/step-shape.svg')",
                    WebkitMaskRepeat: "no-repeat",
                    maskRepeat: "no-repeat",
                    WebkitMaskPosition: "center",
                    maskPosition: "center",
                    WebkitMaskSize: "contain",
                    maskSize: "contain",
                  }}
                />
                <span className="relative z-[1]">{step.num}</span>
              </span>
              <h3
                className="mt-5 max-w-[16ch] text-sm font-bold uppercase tracking-tight"
                style={{ color: PROCESS_TEXT }}
              >
                {step.title}
              </h3>
              <p
                className="mt-2.5 text-sm leading-snug transition-opacity duration-200 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100"
                style={{ color: PROCESS_MUTED }}
              >
                {step.desc}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
