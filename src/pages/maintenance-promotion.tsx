import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import { RiFacebookFill } from "react-icons/ri";
import { BsTwitterX } from "react-icons/bs";
import { BiLogoTiktok } from "react-icons/bi";
import { PiShoppingCart } from "react-icons/pi";

const BG_IMAGES = [
  "/background/pic-1-flip.jpeg",
  "/background/pic-2.jpeg",
  "/background/pic-3.jpeg",
  "/background/pic-4.jpeg",
  "/background/pic-5.jpeg",
  "/background/pic-6.jpeg",
  "/background/pic-7.jpeg",
  "/background/pic-8.jpeg",
  "/background/pic-9.jpeg",
  "/background/pic-10.jpeg",
];

const SLIDER_IMAGES = [...BG_IMAGES, ...BG_IMAGES];
const SCROLL_S   = 35;
const FOOTER_PB  = 12;
const FOOTER_H   = 24;
const SLIDER_GAP = 6;
const BASE_H     = 768; // design reference height

type CardConfig = { w: number; h: number; px: number };

function getConfig(): CardConfig {
  if (typeof window === "undefined") return { w: 210, h: 118, px: 32 };
  const vw = window.innerWidth;
  if (vw < 640)  return { w: 130, h: 80,  px: 20 };
  if (vw < 1024) return { w: 170, h: 100, px: 28 };
  return               { w: 210, h: 118,  px: 32 };
}

export default function MaintenancePromotionPage() {
  const [baseBg, setBaseBg]                 = useState(BG_IMAGES[0]);
  const [overlayBg, setOverlayBg]           = useState(BG_IMAGES[0]);
  const [overlayOpacity, setOverlayOpacity] = useState(0);
  const [overlayTransition, setOverlayTr]   = useState(true);
  const [cfg, setCfg]                       = useState<CardConfig>({ w: 210, h: 118, px: 32 });
  const [scale, setScale]                   = useState(1);
  const [sliderPaused, setSliderPaused]     = useState(false);
  const isAnimating                          = useRef(false);

  useEffect(() => {
    const update = () => {
      setCfg(getConfig());
      setScale(Math.min(1, window.innerHeight / BASE_H));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    BG_IMAGES.forEach((src) => { const i = new window.Image(); i.src = src; });
  }, []);

  const changeBg = useCallback((src: string) => {
    if (src === baseBg || isAnimating.current) return;
    isAnimating.current = true;
    setOverlayBg(src);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setOverlayOpacity(1);
        setTimeout(() => {
          setBaseBg(src);
          setOverlayTr(false);
          setOverlayOpacity(0);
          setTimeout(() => { setOverlayTr(true); isAnimating.current = false; }, 50);
        }, 550);
      });
    });
  }, [baseBg]);

  const sliderBottom = FOOTER_PB + FOOTER_H + SLIDER_GAP;

  // Inverse scale: content wrapper's layout size must be expanded so that
  // after scale() it fills exactly 100vw × 100vh
  const invScale = scale > 0 ? 1 / scale : 1;

  return (
    <div className="relative w-full h-screen overflow-hidden select-none">

      {/* ── z=0  Background base ── */}
      <div style={{ position:"absolute", inset:0, backgroundImage:`url('${baseBg}')`, backgroundSize:"cover", backgroundPosition:"center", zIndex:0 }} />

      {/* ── z=1  Crossfade overlay ── */}
      <div style={{ position:"absolute", inset:0, backgroundImage:`url('${overlayBg}')`, backgroundSize:"cover", backgroundPosition:"center", opacity:overlayOpacity, transition: overlayTransition ? "opacity 0.55s ease" : "none", zIndex:1 }} />

      {/* ── z=3  Scaled UI layer ── */}
      {/* Expanded to (100%/scale × 100vh/scale) in layout, then scaled back to fill viewport */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        transformOrigin: "top left",
        transform: `scale(${scale})`,
        width: `${invScale * 100}%`,
        height: `${invScale * 100}vh`,
        zIndex: 3,
      }}>

        {/* Vignettes — inside scaled layer so darkness stays consistent at all zoom levels */}
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to left, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.38) 28%, transparent 58%)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom, rgba(0,0,0,0.60) 0%, transparent 24%)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"50%", background:"linear-gradient(to top, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.82) 35%, rgba(0,0,0,0.48) 60%, transparent 100%)", pointerEvents:"none" }} />

        {/* Slider */}
        <div
          style={{ position:"absolute", bottom:sliderBottom, left:0, right:0, overflow:"hidden", padding:"4px 0" }}
          onMouseEnter={() => setSliderPaused(true)}
          onMouseLeave={() => setSliderPaused(false)}
        >
          <div style={{ display:"flex", gap:"8px", width:"max-content", animation:`scrollLeft ${SCROLL_S}s linear infinite`, animationPlayState: sliderPaused ? "paused" : "running" }}>
            {SLIDER_IMAGES.map((src, idx) => {
              const orig = BG_IMAGES[idx % BG_IMAGES.length];
              return (
                <div
                  key={`${src}-${idx}`}
                  onClick={() => changeBg(orig)}
                  style={{ position:"relative", flexShrink:0, width:`${cfg.w}px`, height:`${cfg.h}px`, borderRadius:"8px", cursor:"pointer", border: baseBg === orig ? "2px solid rgba(255,255,255,0.85)" : "2px solid transparent", transition:"border-color 0.2s ease, transform 0.2s ease", transformOrigin:"center" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "scale(1.04)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "scale(1)"; }}
                >
                  <div style={{ width:"100%", height:"100%", borderRadius:"6px", overflow:"hidden" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt={`Scene ${(idx % BG_IMAGES.length) + 1}`} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", pointerEvents:"none", filter:"brightness(0.55)" }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Left gradient — on top of slider */}
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right, rgba(0,0,0,0.98) 0%, rgba(0,0,0,0.88) 18%, rgba(0,0,0,0.55) 38%, rgba(0,0,0,0.12) 56%, transparent 72%)", pointerEvents:"none" }} />

        {/* GTA VI Box Art (top-right) */}
        <div style={{ position:"absolute", top:16, right:16 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/gta6-boxart.png" alt="GTA VI PS5 Box Art" className="p-boxart" style={{ display:"block", objectFit:"contain" }} />
        </div>

        {/* Left column: Logo → Content → Footer */}
        <div style={{ position:"absolute", top:0, bottom:0, left:0, display:"flex", flexDirection:"column", overflow:"hidden" }}>

          {/* Logo */}
          <div className="p-logo-wrap" style={{ display:"flex", alignItems:"center", flexShrink:0 }}>
            <Image src="/sage-logo.png" alt="Sage Gaming Logo" width={38} height={44} style={{ objectFit:"contain" }} className="p-logo-img" />
            <span className="p-logo-text" style={{ fontFamily:"'Jost', sans-serif", fontWeight:600, color:"#FFFFFF", lineHeight:1 }}>
              Sage Gaming
            </span>
          </div>

          {/* Content */}
          <div className="p-content-area" style={{ flex:1, display:"flex", alignItems:"flex-start", paddingBottom: sliderBottom + cfg.h + 8, minHeight:0, overflow:"hidden" }}>
            <div className="p-content-inner" style={{ paddingLeft: cfg.px }}>

              <h1 className="p-title" style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontWeight:700, color:"#FFFFFF", letterSpacing:0 }}>
                Grand Theft Auto (GTA) VI
              </h1>

              <p className="p-desc" style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontWeight:400, color:"#FFFFFF" }}>
                Pre-order Grand Theft Auto VI for PS5 and lock in your copy before launch. Fast, easy ordering through{" "}
                <span style={{ fontWeight:600 }}>Sage Gaming.</span>
              </p>

              <p className="p-price" style={{ fontFamily:"'Inter', sans-serif", fontWeight:700, lineHeight:"100%", color:"#FFFFFF", letterSpacing:0 }}>
                Only $116.00
              </p>

              <div className="p-btn-wrap">
                <a href="https://square.link/u/eDsnAgwS" target="_blank" rel="noopener noreferrer" className="p-btn"
                  style={{ display:"inline-flex", alignItems:"center", backgroundColor:"#FFFFFF", borderRadius:6, textDecoration:"none" }}>
                  <PiShoppingCart className="p-btn-icon" color="#103178" />
                  <span className="p-btn-text" style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontWeight:600, lineHeight:"100%", letterSpacing:0, color:"#103178" }}>Pre Order Now</span>
                </a>
              </div>

              <p className="p-contact" style={{ fontFamily:"'Inter', sans-serif", fontWeight:400, color:"#FFFFFF" }}>
                Or get in touch with our team directly:
              </p>

              <a href="mailto:sales@sagegaming.com.au" className="p-contact-link" style={{ display:"flex", alignItems:"center", fontFamily:"'Inter', sans-serif", fontWeight:400, color:"#FFFFFF", textDecoration:"none" }}>
                <Mail className="p-contact-icon" color="#FFFFFF" />
                sales@sagegaming.com.au
              </a>

              <a href="tel:+61451747228" className="p-contact-link p-phone" style={{ display:"flex", alignItems:"center", fontFamily:"'Inter', sans-serif", fontWeight:400, color:"#FFFFFF", textDecoration:"none" }}>
                <Phone className="p-contact-icon" color="#FFFFFF" />
                +61 451 747 228
              </a>

              <div className="p-divider" style={{ width:50, height:0, borderTop:"1px solid rgba(255,255,255,0.7)" }} />

              <div className="p-social-row" style={{ display:"flex", alignItems:"center" }}>
                {[
                  { href:"https://www.facebook.com/sagegaming2022", icon:<RiFacebookFill />, label:"Facebook" },
                  { href:"https://x.com/sagegaming2022",            icon:<BsTwitterX />,    label:"X/Twitter" },
                  { href:"https://www.tiktok.com/@sagegaming2022",  icon:<BiLogoTiktok />,  label:"TikTok" },
                ].map(({ href, icon, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="p-social-btn"
                    style={{ display:"flex", alignItems:"center", justifyContent:"center", borderRadius:"50%", backgroundColor:"#FFFFFF", color:"#000", flexShrink:0 }}>
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-footer-wrap" style={{ flexShrink:0, paddingLeft: cfg.px, paddingBottom: FOOTER_PB }}>
            <p className="p-footer-text" style={{ fontFamily:"'Inter', sans-serif", fontWeight:400, color:"#FFFFFF" }}>
              Powered by{" "}
              <a href="https://xprogroup.com.au/" target="_blank" rel="noopener noreferrer" style={{ fontWeight:700, color:"#FFFFFF", textDecoration:"none" }}>Xpro Group</a>
            </p>
          </div>
        </div>

      </div>{/* end scaled UI layer */}

      <style jsx global>{`

        /* ══════════════════════════════════════════════════════
           BOX ART
        ══════════════════════════════════════════════════════ */
        .p-boxart { width: 160px; height: auto; }
        @media (min-width: 640px)  { .p-boxart { width: 210px; } }
        @media (min-width: 1024px) { .p-boxart { width: 266px; height: 335px; } }

        /* ── Content inner — max-width avoids box art overlap ── */
        .p-content-inner { max-width: calc(100% - 200px); padding-right: 8px; }
        @media (min-width: 640px)  { .p-content-inner { max-width: calc(100% - 258px); } }
        @media (min-width: 1024px) { .p-content-inner { max-width: 520px; } }

        /* ══════════════════════════════════════════════════════
           LOGO
        ══════════════════════════════════════════════════════ */
        .p-logo-wrap { padding: 16px 20px; gap: 8px; }
        .p-logo-img  { width: 30px !important; height: 35px !important; }
        .p-logo-text { font-size: 22px; }
        @media (min-width: 640px) {
          .p-logo-wrap { padding: 20px 28px; gap: 10px; }
          .p-logo-img  { width: 34px !important; height: 40px !important; }
          .p-logo-text { font-size: 26px; }
        }
        @media (min-width: 1024px) {
          .p-logo-wrap { padding: 24px 32px; gap: 10px; }
          .p-logo-img  { width: 38px !important; height: 44px !important; }
          .p-logo-text { font-size: 30px; }
        }

        /* ══════════════════════════════════════════════════════
           CONTENT — fixed design sizes (scale handles zoom)
        ══════════════════════════════════════════════════════ */
        .p-content-area { padding-top: 0; }
        .p-title      { font-size: clamp(28px, 7vw, 64px); line-height: 1.12; margin-bottom: 14px; }
        .p-desc       { font-size: clamp(13px, 1.6vw, 16px); line-height: 1.5; margin-bottom: 20px; }
        .p-price      { font-size: 36px; margin-bottom: 12px; }
        .p-btn-wrap   { margin-bottom: 16px; }
        .p-btn        { padding: 10px 14px; gap: 8px; }
        .p-btn-text   { font-size: 16px; }
        .p-btn-icon   { width: 18px !important; height: 18px !important; }
        .p-contact    { font-size: clamp(12px, 1.5vw, 15px); margin-bottom: 5px; }
        .p-contact-link { font-size: clamp(12px, 1.5vw, 15px); margin-bottom: 4px; gap: 7px; }
        .p-contact-icon { width: 15px !important; height: 15px !important; }
        .p-phone      { margin-bottom: 16px; }
        .p-divider    { margin-bottom: 16px; }
        .p-social-row { gap: 10px; }
        .p-social-btn { width: 36px; height: 36px; padding: 9px; font-size: 18px; }
        .p-footer-text { font-size: 16px; }

        /* ══════════════════════════════════════════════════════
           SCROLL ANIMATION
        ══════════════════════════════════════════════════════ */
        @keyframes scrollLeft {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-${BG_IMAGES.length * (210 + 8)}px); }
        }
        @media (max-width: 639px) {
          @keyframes scrollLeft {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-${BG_IMAGES.length * (130 + 8)}px); }
          }
        }
        @media (min-width: 640px) and (max-width: 1023px) {
          @keyframes scrollLeft {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-${BG_IMAGES.length * (170 + 8)}px); }
          }
        }
      `}</style>
    </div>
  );
}
