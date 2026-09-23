import { useState } from "react";
import Reveal from "./Reveal";

const FAQS = [
  {
    question: "¿Trabajan solo con empresas?",
    answer:
      "No. Trabajamos con marcas, negocios, marcas personales, creadores y streamers que quieran mejorar cómo se ven y se comunican.",
  },
  {
    question: "¿Pueden crear mi marca desde cero?",
    answer:
      "Sí. Podemos trabajar desde la identidad visual y el estilo hasta cómo tu marca se presenta en redes y contenido.",
  },
  {
    question: "¿Cómo sé qué servicio necesito?",
    answer:
      "Nos cuentas en qué punto estás y qué quieres conseguir. Nosotros te ayudamos a encontrar la opción que más sentido tenga para ti.",
  },
  {
    question: "¿Qué pasa si necesito algo que no está incluido en el paquete?",
    answer:
      "Te presentamos el alcance y el costo del servicio adicional antes de realizarlo. Nada se ejecuta ni se cobra sin tu aprobación previa.",
  },
  {
    question: "¿Cómo funciona la permanencia y la cancelación?",
    answer:
      "Nuestros paquetes tienen un compromiso mínimo de 3 meses de permanencia establecido mediante contrato. Si decides finalizar el servicio antes de cumplir este período, se aplicará un cargo por cancelación del saldo pendiente del contrato.",
  },
  {
    question: "¿Esto es para cualquier tipo de empresa?",
    answer:
      "Trabajamos con marcas que buscan construir una presencia digital sólida y profesional. Antes de comenzar analizamos tu negocio, objetivos y audiencia para determinar que es lo que mejor se adapta para tus objetivos.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-black px-6 py-14 md:px-10 md:py-20 lg:px-20">
      <div className="mx-auto flex max-w-[1140px] flex-col gap-10">
        <Reveal className="flex flex-col items-end gap-3 text-right">
          <h2
            className="font-bold leading-[0.95] tracking-tight text-epik-lime"
            style={{ fontSize: "clamp(2rem, 6vw, 64px)" }}
          >
            Preguntas
            <br />
            frecuentes
          </h2>
          <p className="max-w-2xl text-[15px] leading-relaxed text-epik-text">
            Resolvemos las dudas más comunes sobre cómo trabajamos en Epik.
          </p>
        </Reveal>

        <Reveal
          delay={100}
          className="flex flex-col items-start gap-8 lg:flex-row lg:items-stretch lg:justify-center"
        >
          <img
            src="/images/faq-swirl.png"
            alt=""
            className="h-[280px] w-full rounded-[16px] object-cover sm:h-[360px] lg:h-auto lg:w-[556px]"
          />

          <div className="w-full rounded-[27px] bg-epik-panel px-6 py-6 sm:px-8 sm:py-4 lg:w-[553px]">
            {FAQS.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={faq.question}
                  className={i !== 0 ? "border-t border-epik-text/20" : ""}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="press flex w-full items-center justify-between gap-4 py-6 text-left"
                  >
                    <span className="text-base font-bold tracking-[-0.5px] text-epik-text">
                      {faq.question}
                    </span>
                    <svg
                      viewBox="0 0 24 24"
                      className={`h-6 w-6 shrink-0 text-epik-text transition-transform duration-200 ease-[var(--ease-out)] ${isOpen ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        d="M6 9l6 6 6-6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <div className={`disclosure ${isOpen ? "is-open" : ""}`}>
                    <div>
                      <p className="disclosure-fade pb-6 text-sm leading-relaxed text-epik-text/70">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
