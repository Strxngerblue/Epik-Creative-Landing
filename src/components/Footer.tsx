import Reveal from "./Reveal";

const SOCIALS = [
  { label: "Instagram", href: "#", icon: "/images/icon-instagram.svg" },
  { label: "TikTok", href: "#", icon: "/images/icon-tiktok.svg" },
  { label: "Email", href: "#", icon: "/images/icon-email.svg" },
  { label: "WhatsApp", href: "#", icon: "/images/icon-whatsapp.svg" },
];

const MENU = [
  { label: "Qué hacemos", href: "#quienes-somos" },
  { label: "Paquetes", href: "#paquetes" },
  { label: "Cómo funciona", href: "#proceso" },
  { label: "Preguntas", href: "#faq" },
  { label: "Hablemos", href: "#contacto" },
];

export default function Footer() {
  return (
    <footer id="contacto" className="px-6 pb-6 md:px-10 lg:px-20">
      <Reveal
        as="div"
        className="mx-auto max-w-[1260px] overflow-hidden rounded-[28px] bg-epik-lime px-6 pt-8 pb-6 sm:rounded-[40px] sm:px-10 sm:pt-10 md:px-14"
      >
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="flex max-w-[280px] flex-col items-start gap-4">
            <img
              src="/images/footer-logo.png"
              alt="Epik Bizz"
              className="h-8 w-auto"
            />
            <p className="text-[13px] leading-snug text-[#0b0b0b]">
              Hagamos que tu marca evolucione. Hagamos que sea Epik.
            </p>
            <div className="flex gap-2.5">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="press flex h-9 w-9 items-center justify-center rounded-lg border border-[#0b0b0b] transition-opacity hover:opacity-70"
                >
                  <img src={social.icon} alt="" className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-start gap-4">
            <p className="text-[11px] tracking-[2px] text-[#0b0b0b]/55 uppercase">
              Menú
            </p>
            <nav className="flex flex-col gap-3.5">
              {MENU.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-[13px] text-[#0b0b0b] transition-opacity hover:opacity-70"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-8 border-t border-black/15 pt-4">
          <p className="text-[11px] tracking-[1.6px] text-[#0b0b0b]/55 uppercase">
            © 2026 Epik Creative. Todos los derechos reservados.
          </p>
        </div>

        <img
          src="/images/footer-epik-wordmark.png"
          alt=""
          aria-hidden
          className="-mx-6 -mb-6 mt-6 w-[calc(100%+3rem)] sm:-mx-10 sm:-mb-6 sm:w-[calc(100%+5rem)] md:-mx-14 md:w-[calc(100%+7rem)]"
        />
      </Reveal>
    </footer>
  );
}
