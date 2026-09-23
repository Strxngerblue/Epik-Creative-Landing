import { useState } from "react";

const LINKS = [
  { label: "Qué hacemos", href: "#quienes-somos" },
  { label: "Paquetes", href: "#paquetes" },
  { label: "Cómo funciona", href: "#proceso" },
  { label: "Preguntas", href: "#faq" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-black/30 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4 md:px-10 lg:px-20">
        <a href="#top" className="shrink-0">
          <img
            src="/images/logo-epik-bizz.png"
            alt="Epik Bizz"
            className="h-8 w-auto md:h-10"
          />
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-bold tracking-[-0.4px] text-epik-text transition-opacity hover:opacity-70"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#contacto"
          className="press hidden h-11 items-center justify-center rounded-full bg-epik-lime px-5 text-sm font-bold tracking-[-0.4px] text-black transition-opacity hover:opacity-80 lg:flex"
        >
          Hablemos
        </a>

        <button
          type="button"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="press flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
        >
          <span
            className={`h-0.5 w-6 bg-epik-text transition-transform duration-200 ease-[var(--ease-in-out)] ${open ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`h-0.5 w-6 bg-epik-text transition-opacity duration-150 ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`h-0.5 w-6 bg-epik-text transition-transform duration-200 ease-[var(--ease-in-out)] ${open ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      <div
        className={`disclosure border-t border-white/10 bg-black/95 lg:hidden ${open ? "is-open" : ""}`}
        aria-hidden={!open}
      >
        <div>
          <nav className="disclosure-fade flex flex-col gap-5 px-6 py-6">
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-base font-bold text-epik-text"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contacto"
              onClick={() => setOpen(false)}
              className="press mt-2 flex h-11 items-center justify-center rounded-full bg-epik-lime px-5 text-sm font-bold text-black"
            >
              Hablemos
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
