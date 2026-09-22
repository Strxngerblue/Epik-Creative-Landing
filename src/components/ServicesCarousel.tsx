import { useRef, useState } from "react";
import Reveal from "./Reveal";

const SERVICE_CARDS = [
  {
    id: "beach",
    tab: "Beach",
    title: "Forest Trail",
    location: "Jalan Menuju Curug Gombong",
    image: "/images/card-forest-camp.png",
  },
  {
    id: "mountain",
    tab: "Mountain",
    title: "Curug Cipendok",
    location: "Cilongok, Banyumas",
    image: "/images/card-curug-cipendok.png",
  },
  {
    id: "waterfall",
    tab: "Waterfall",
    title: "Forest Trail",
    location: "Jalan Menuju Curug Gombong",
    image: "/images/card-forest-trail.png",
  },
  {
    id: "hill",
    tab: "Hill",
    title: "Forest Trail",
    location: "Jalan Menuju Curug Gombong",
    image: "/images/card-forest-camp.png",
  },
  {
    id: "lake",
    tab: "Lake",
    title: "Curug Cipendok",
    location: "Cilongok, Banyumas",
    image: "/images/card-curug-cipendok.png",
  },
] as const;

// Flex + scroll-snap the whole way from phone through tablet (a grid with one
// spanning cell among 3 items auto-places into ragged, gappy rows — this
// keeps a single, consistent carousel behavior instead).
const SIZE_LG =
  "h-[500px] w-[82vw] max-w-[380px] md:h-[560px] md:w-[62vw] md:max-w-[460px] lg:h-[680px] lg:w-[420px]";
const SIZE_SM =
  "h-[420px] w-[70vw] max-w-[280px] md:h-[480px] md:w-[42vw] md:max-w-[320px] lg:h-[580px] lg:w-[300px]";

function scrollIntoCenter(el: HTMLElement | null) {
  if (!el) return;
  // Deferred two frames: at the exact mount instant the card is still mid
  // way through its scale(0.96)->scale(1) entrance animation (or, in dev
  // StrictMode, briefly re-mounting), so measuring/scrolling immediately
  // targets the wrong, still-settling geometry.
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      el.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        inline: "center",
        block: "nearest",
      });
    });
  });
}

function ServiceCard({
  card,
  size,
  onMount,
}: {
  card: (typeof SERVICE_CARDS)[number];
  size: "lg" | "sm";
  onMount?: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div
      ref={onMount}
      className={`card-slide-in group relative shrink-0 snap-center overflow-hidden rounded-[32px] border border-white/15 transition-transform duration-300 ease-[var(--ease-out)] [@media(hover:hover)]:hover:-translate-y-1 ${
        size === "lg" ? SIZE_LG : SIZE_SM
      }`}
    >
      <img
        src={card.image}
        alt={card.title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-[var(--ease-out)] [@media(hover:hover)]:group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 via-40% to-black/85" />
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1.5 p-6">
        <p className="text-2xl font-bold tracking-tight text-white">
          {card.title}
        </p>
        <p className="text-sm font-medium text-white/70">{card.location}</p>
      </div>
    </div>
  );
}

export default function ServicesCarousel() {
  const [activeIndex, setActiveIndex] = useState(2);
  const count = SERVICE_CARDS.length;
  const prevIndex = (activeIndex - 1 + count) % count;
  const nextIndex = (activeIndex + 1) % count;
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function selectTab(index: number) {
    setActiveIndex(index);
    scrollIntoCenter(tabRefs.current[index]);
  }

  return (
    <section
      id="servicios"
      className="bg-black px-6 py-14 md:px-10 md:py-20 lg:px-20"
    >
      <div className="mx-auto flex max-w-[1140px] flex-col gap-10">
        <Reveal className="flex flex-col gap-3">
          <p
            className="font-bold tracking-wide text-epik-text/95 uppercase"
            style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)" }}
          >
            Nuestros Servicios
          </p>
          <h2
            className="font-bold leading-[0.95] text-epik-lime uppercase"
            style={{ fontSize: "clamp(2.5rem, 8vw, 84px)" }}
          >
            Transformamos lo que te hace diferente en algo imposible de
            ignorar.
          </h2>
          <p className="max-w-2xl text-[15px] leading-relaxed text-epik-text">
            Epik Creative convierte tu marca en algo que todos quieren mirar.
            Nosotros logramos que se vea así.
          </p>
        </Reveal>

        <Reveal
          delay={80}
          className="-mx-6 flex justify-start overflow-x-auto px-6 sm:mx-0 sm:justify-center sm:px-0"
        >
          <div className="flex shrink-0 items-center gap-2 rounded-full border border-white/20 bg-white/5 p-2">
            {SERVICE_CARDS.map((card, index) => (
              <button
                key={card.tab}
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                type="button"
                onClick={() => selectTab(index)}
                aria-pressed={activeIndex === index}
                className={`press shrink-0 rounded-full px-6 py-2.5 text-[15px] font-medium whitespace-nowrap transition-colors duration-200 ${
                  activeIndex === index
                    ? "bg-white/25 font-bold text-white"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {card.tab}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal
          delay={140}
          className="-mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 md:justify-center lg:mx-0 lg:justify-center lg:gap-8 lg:px-0"
        >
          <ServiceCard
            key={`prev-${SERVICE_CARDS[prevIndex].id}`}
            card={SERVICE_CARDS[prevIndex]}
            size="sm"
          />
          <ServiceCard
            key={`active-${SERVICE_CARDS[activeIndex].id}`}
            card={SERVICE_CARDS[activeIndex]}
            size="lg"
            onMount={scrollIntoCenter}
          />
          <ServiceCard
            key={`next-${SERVICE_CARDS[nextIndex].id}`}
            card={SERVICE_CARDS[nextIndex]}
            size="sm"
          />
        </Reveal>
      </div>
    </section>
  );
}
