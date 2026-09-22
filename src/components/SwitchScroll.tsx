"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";

// Same PNG already used elsewhere on the page (public/images/streams-mockup.png):
// a Switch frame with a fully transparent cutout where the screen goes.
const SWITCH_FRAME = "/images/streams-mockup.png";

export interface SwitchScrollCard {
  id?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  image?: string;
  imagePosition?: string;
  href?: string;
  linkLabel?: string;
}

interface SwitchScrollProps {
  cards?: SwitchScrollCard[];
  maxWidth?: number;
  scrollStep?: number;
  className?: string;
  style?: CSSProperties;
  onCardChange?: (index: number) => void;
}

/**
 * Ported from github.com/iKhunsa/switch-scroll-react (SwitchScroll.jsx), adapted to
 * TypeScript and pointed at our existing frame asset instead of an inline base64 copy.
 * Sticky-scroll card carousel inside a Switch frame: normal page scroll fades between
 * cards (never two at once), no buttons/dots, rotates the frame 90° on small screens,
 * and respects prefers-reduced-motion.
 */
export default function SwitchScroll({
  cards = [],
  maxWidth = 1140,
  scrollStep = 0.7,
  className = "",
  style,
  onCardChange,
}: SwitchScrollProps) {
  const root = useRef<HTMLElement | null>(null);
  const track = useRef<HTMLDivElement | null>(null);
  const callback = useRef(onCardChange);
  const [active, setActive] = useState(0);
  const id = useId();
  const count = cards.length;
  const step = Math.max(0.25, Number(scrollStep) || 0.7);
  const selected = Math.min(active, Math.max(0, count - 1));
  callback.current = onCardChange;

  useEffect(() => {
    const section = root.current;
    if (!section || !count) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 1025px)");
    let frame = 0;
    let previous = -1;
    const update = () => {
      frame = 0;
      const sticky = section.querySelector<HTMLElement>(".ss-sticky");
      if (!sticky) return;
      // Center the sticky box on the *actual* viewport instead of trusting a
      // hardcoded CSS calc() — self-corrects for any browser/zoom/measured
      // height instead of assuming the device is always exactly 422px tall.
      if (desktop.matches) {
        const centeredTop = Math.max(0, (window.innerHeight - sticky.offsetHeight) / 2);
        sticky.style.top = `${centeredTop}px`;
      } else {
        sticky.style.top = "";
      }
      const travel = section.offsetHeight - sticky.offsetHeight;
      const progress =
        travel > 0
          ? Math.max(
              0,
              Math.min(
                count - 1,
                (-section.getBoundingClientRect().top / travel) * (count - 1),
              ),
            )
          : 0;
      const next = Math.round(progress);
      // Fade out completely before changing cards; never show two at once.
      const distance = Math.abs(progress - next);
      const fade = Math.max(0, Math.min(1, (0.5 - distance) / 0.3));
      const opacity = reduce.matches ? 1 : fade * fade * (3 - 2 * fade);
      track.current?.style.setProperty("--card-opacity", String(opacity));
      if (next !== previous) {
        previous = next;
        setActive(next);
        callback.current?.(next);
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(section);
    const sticky = section.querySelector<HTMLElement>(".ss-sticky");
    if (sticky) observer.observe(sticky);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reduce.addEventListener("change", schedule);
    desktop.addEventListener("change", schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reduce.removeEventListener("change", schedule);
      desktop.removeEventListener("change", schedule);
    };
  }, [count, step]);

  function goTo(index: number) {
    const section = root.current;
    if (!section) return;
    const sticky = section.querySelector<HTMLElement>(".ss-sticky");
    if (!sticky) return;
    const next = Math.max(0, Math.min(count - 1, index));
    const travel = section.offsetHeight - sticky.offsetHeight;
    const start = window.scrollY + section.getBoundingClientRect().top;
    window.scrollTo({
      top: start + (count > 1 ? (next / (count - 1)) * travel : 0),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }

  function onKeyDown(event: KeyboardEvent<HTMLElement>) {
    // Keep native button/link activation and Tab navigation intact.
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    const destinations: Record<string, number> = {
      ArrowDown: selected + 1,
      ArrowRight: selected + 1,
      ArrowUp: selected - 1,
      ArrowLeft: selected - 1,
      Home: 0,
      End: count - 1,
    };
    if (event.key in destinations) {
      event.preventDefault();
      goTo(destinations[event.key]);
    }
  }

  if (!count) return null;

  return (
    <section
      ref={root}
      className={`switch-scroll ${className}`}
      aria-label="Historias en Nintendo Switch"
      aria-roledescription="carrusel"
      onKeyDown={onKeyDown}
      style={
        {
          "--switch-width": `${maxWidth}px`,
          "--switch-travel": `${(count - 1) * step * 100}svh`,
          ...style,
        } as CSSProperties
      }
    >
      <style>{`
        .switch-scroll { position:relative; height:calc(100svh + var(--switch-travel)); width:100%; font-family:Arial, Helvetica, sans-serif; color:#fff; }
        .switch-scroll, .switch-scroll * { box-sizing:border-box; }
        .switch-scroll .ss-sticky { position:sticky; top:0; height:100svh; display:flex; align-items:center; justify-content:center; padding:24px; }
        .switch-scroll .ss-device { position:relative; width:min(100%, var(--switch-width), calc(82svh * 2061 / 763)); aspect-ratio:2061 / 763; container-type:inline-size; isolation:isolate; }
        .switch-scroll .ss-frame { position:absolute; z-index:2; inset:0; width:100%; height:100%; pointer-events:none; user-select:none; }
        .switch-scroll .ss-screen { position:absolute; z-index:1; left:18.53%; top:8.65%; width:63.15%; height:79.2%; border-radius:1.1% / 2.5%; overflow:hidden; background:#0b0b0b; }
        .switch-scroll .ss-track { position:relative; width:100%; height:100%; }
        .switch-scroll .ss-card { position:absolute; inset:0; width:100%; height:100%; overflow:hidden; background:#0d0d0d; opacity:0; visibility:hidden; }
        .switch-scroll .ss-card[aria-hidden="false"] { opacity:var(--card-opacity,1); visibility:visible; }
        .switch-scroll .ss-art { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; }
        .switch-scroll .ss-shade { position:absolute; inset:0; background:linear-gradient(90deg,rgba(8,9,24,.5),transparent 95%),linear-gradient(0deg,rgba(8,9,24,.82),transparent 85%); }
        .switch-scroll .ss-copy { position:absolute; left:7%; right:9%; bottom:19%; }
        .switch-scroll .ss-eyebrow { display:block; margin:0 0 14px; color:#baff19; font-size:clamp(10px,1.1cqw,13px); line-height:1.4; letter-spacing:.15em; font-weight:600; }
        .switch-scroll .ss-title { max-width:13em; margin:0; font-size:clamp(24px,4.4cqw,52px); line-height:1.02; letter-spacing:-.045em; font-weight:600; text-wrap:balance; }
        .switch-scroll .ss-subtitle { max-width:30em; margin:14px 0 0; font-size:clamp(12px,1.4cqw,16px); line-height:1.55; color:rgba(255,255,255,.84); text-wrap:pretty; }
        .switch-scroll .ss-link { display:inline-block; color:white; font-size:14px; margin-top:16px; text-underline-offset:4px; }
        .switch-scroll a:focus-visible { outline:2px solid #baff19; outline-offset:3px; }
        .switch-scroll .ss-sr { position:absolute; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden; clip:rect(0,0,0,0); white-space:nowrap; border:0; }
        @media (max-width:1024px) and (orientation:portrait), (max-width:700px) {
          .switch-scroll .ss-sticky { padding:20px 12px; }
          .switch-scroll .ss-device { width:min(100%, 360px, calc(88svh * 763 / 2061)); aspect-ratio:763 / 2061; }
          .switch-scroll .ss-frame { inset:auto; top:50%; left:50%; width:270.117955%; height:37.020864%; max-width:none; transform:translate(-50%,-50%) rotate(90deg); }
          .switch-scroll .ss-screen { left:12.15%; top:18.53%; width:79.2%; height:63.15%; border-radius:2.5% / 1.1%; }
          .switch-scroll .ss-art { object-position:64% center; }
          .switch-scroll .ss-copy { left:9%; right:9%; bottom:27%; }
          .switch-scroll .ss-eyebrow { font-size:11px; letter-spacing:.1em; margin-bottom:16px; }
          .switch-scroll .ss-title { font-size:clamp(26px,11cqw,40px); line-height:1.06; }
          .switch-scroll .ss-subtitle { font-size:14px; line-height:1.55; margin-top:16px; }
        }
        @media (min-width:1025px) {
          /* Fixed-height sticky box; JS (in the effect above) sets its exact
             "top" from measured viewport/box heights every scroll+resize, so
             the margin above and below the device stays equal on any real
             browser instead of trusting a hardcoded CSS calc() guess. */
          .switch-scroll { height:calc(582px + var(--switch-travel)); }
          .switch-scroll .ss-sticky { height:582px; padding:24px; }
        }
        @media (max-height:500px) and (orientation:landscape) {
          .switch-scroll .ss-device { width:min(100%, var(--switch-width), calc(94svh * 2061 / 763)); }
          .switch-scroll .ss-sticky { padding:8px 20px; }
          .switch-scroll .ss-eyebrow { margin-bottom:6px; font-size:10px; }
          .switch-scroll .ss-title { font-size:clamp(20px,3.6cqw,36px); }
          .switch-scroll .ss-subtitle { margin-top:8px; }
          .switch-scroll .ss-copy { bottom:23%; }
        }
      `}</style>
      <div className="ss-sticky">
        <div className="ss-device">
          <div className="ss-screen" id={`${id}-screen`}>
            <div className="ss-track" ref={track}>
              {cards.map((card, index) => (
                <article
                  className="ss-card"
                  key={card.id ?? index}
                  aria-label={`${index + 1} de ${count}: ${card.title}`}
                  aria-hidden={selected !== index}
                  inert={selected !== index}
                >
                  {card.image && (
                    <img
                      className="ss-art"
                      src={card.image}
                      style={
                        card.imagePosition
                          ? { objectPosition: card.imagePosition }
                          : undefined
                      }
                      alt=""
                      draggable="false"
                      decoding="async"
                    />
                  )}
                  <div className="ss-shade" />
                  <div className="ss-copy">
                    {card.eyebrow && (
                      <span className="ss-eyebrow">{card.eyebrow}</span>
                    )}
                    <h2 className="ss-title">{card.title}</h2>
                    {card.subtitle && (
                      <p className="ss-subtitle">{card.subtitle}</p>
                    )}
                    {card.href && (
                      <a className="ss-link" href={card.href}>
                        {card.linkLabel || "Descubrir"} ↗
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
          <img className="ss-frame" src={SWITCH_FRAME} alt="" draggable="false" />
          <p className="ss-sr" aria-live="polite" aria-atomic="true">
            Tarjeta {selected + 1} de {count}: {cards[selected]?.title}
          </p>
        </div>
      </div>
    </section>
  );
}
