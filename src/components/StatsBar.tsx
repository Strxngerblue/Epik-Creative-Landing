import Reveal from "./Reveal";

const STATS = [
  { value: "40+", label: "Proyectos Exitosos" },
  { value: "100%", label: "Satisfacción" },
  { value: "2", label: "Mentes Creativas" },
  { value: "∞", label: "Ideas por Realizar" },
];

export default function StatsBar() {
  return (
    <section className="bg-black px-6 py-8 md:py-10">
      <div className="mx-auto grid max-w-[1140px] grid-cols-2 gap-8 sm:gap-10 md:flex md:items-center md:justify-center md:gap-16">
        {STATS.map((stat, i) => (
          <Reveal
            key={stat.label}
            delay={i * 60}
            className="flex flex-col items-start gap-1"
          >
            <p className="text-3xl font-bold text-epik-text sm:text-4xl">
              {stat.value}
            </p>
            <p className="text-[13px] tracking-wide text-epik-text uppercase">
              {stat.label}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
