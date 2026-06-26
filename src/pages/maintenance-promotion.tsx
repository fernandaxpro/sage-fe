import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import { RiFacebookFill } from "react-icons/ri";
import { BsTwitterX } from "react-icons/bs";
import { BiLogoTiktok } from "react-icons/bi";
import { FaWhatsapp } from "react-icons/fa";

const BG_IMAGES = [
  "/background/pic-1.jpeg",
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
const SCROLL_S      = 35;
const FOOTER_PB     = 12;
const FOOTER_H      = 24;
const SLIDER_GAP    = 6;

// Responsive card sizes per breakpoint
type CardConfig = { w: number; h: number; contentTop: number; px: number };
const BREAKPOINTS: Record<string, CardConfig> = {
  sm:  { w: 130, h: 80,  contentTop: 68,  px: 20 },
  md:  { w: 170, h: 100, contentTop: 90,  px: 28 },
  lg:  { w: 210, h: 118, contentTop: 130, px: 32 },
};

function getConfig(): CardConfig {
  if (typeof window === "undefined") return BREAKPOINTS.lg;
  const w = window.innerWidth;
  if (w < 640)  return BREAKPOINTS.sm;
  if (w < 1024) return BREAKPOINTS.md;
  return BREAKPOINTS.lg;
}

export default function MaintenancePromotionPage() {
  const [baseBg, setBaseBg]               = useState(BG_IMAGES[0]);
  const [overlayBg, setOverlayBg]         = useState(BG_IMAGES[0]);
  const [overlayOpacity, setOverlayOpacity] = useState(0);
  const [overlayTransition, setOverlayTr] = useState(true);
  const [cfg, setCfg]                     = useState<CardConfig>(BREAKPOINTS.lg);
  const [sliderPaused, setSliderPaused]   = useState(false);
  const isAnimating                        = useRef(false);

  // Responsive card size tracking
  useEffect(() => {
    const update = () => setCfg(getConfig());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Preload all images
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

  return (
    <div className="relative w-full h-screen overflow-hidden select-none">

      {/* ── z=0  Background base ── */}
      <div style={{ position:"absolute", inset:0, backgroundImage:`url('${baseBg}')`, backgroundSize:"cover", backgroundPosition:"center", zIndex:0 }} />

      {/* ── z=1  Crossfade overlay ── */}
      <div style={{ position:"absolute", inset:0, backgroundImage:`url('${overlayBg}')`, backgroundSize:"cover", backgroundPosition:"center", opacity:overlayOpacity, transition: overlayTransition ? "opacity 0.55s ease" : "none", zIndex:1 }} />

      {/* ── z=2  Vignette: right ── */}
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(to left, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.38) 28%, transparent 58%)", zIndex:2, pointerEvents:"none" }} />

      {/* ── z=2  Vignette: top ── */}
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom, rgba(0,0,0,0.60) 0%, transparent 24%)", zIndex:2, pointerEvents:"none" }} />

      {/* ── z=2  Vignette: bottom ── */}
      <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"380px", background:"linear-gradient(to top, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.82) 35%, rgba(0,0,0,0.48) 60%, transparent 100%)", zIndex:2, pointerEvents:"none" }} />

      {/* ── z=3  Slider ── */}
      <div
        style={{ position:"absolute", bottom:sliderBottom, left:0, right:0, overflow:"hidden", zIndex:3, padding:"4px 0" }}
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

      {/* ── z=4  Left gradient — on top of slider ── */}
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right, rgba(0,0,0,0.98) 0%, rgba(0,0,0,0.88) 18%, rgba(0,0,0,0.55) 38%, rgba(0,0,0,0.12) 56%, transparent 72%)", zIndex:4, pointerEvents:"none" }} />

      {/* ── z=5  Logo ── */}
      <div className="promo-logo-wrap" style={{ position:"absolute", top:0, left:0, display:"flex", alignItems:"center", gap:10, zIndex:5 }}>
        <Image src="/sage-logo.png" alt="Sage Gaming Logo" width={38} height={44} style={{ objectFit:"contain" }} className="promo-logo-img" />
        <span className="promo-logo-text" style={{ fontFamily:"'Jost', sans-serif", fontWeight:600, color:"#FFFFFF", lineHeight:1 }}>
          Sage Gaming
        </span>
      </div>

      {/* ── z=5  Main content ── */}
      <div
        style={{
          position:"absolute",
          top: cfg.contentTop,
          bottom: sliderBottom + cfg.h + 16,
          left:0,
          display:"flex",
          alignItems:"center",
          zIndex:5,
        }}
      >
        <div style={{ paddingLeft: cfg.px, paddingRight: cfg.px, maxWidth: cfg.px === 20 ? "100%" : 520 }}>

          {/* Title */}
          <h1 className="promo-title" style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontWeight:700, color:"#FFFFFF", letterSpacing:0 }}>
            Grand Theft Auto (GTA) VI
          </h1>

          {/* Description */}
          <p className="promo-desc" style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontWeight:400, color:"#FFFFFF" }}>
            Pre-order Grand Theft Auto VI for PS5 and lock in your copy before launch. Fast, easy ordering through{" "}
            <span style={{ fontWeight:600 }}>Sage Gaming.</span>
          </p>

          {/* Price */}
          <p style={{ fontFamily:"'Inter', sans-serif", fontWeight:700, fontSize:"36px", lineHeight:"100%", color:"#FFFFFF", letterSpacing:0, marginBottom:12 }}>
            Only $116.00
          </p>

          {/* Button */}
          <div className="promo-btn-wrap">
            <a href="https://wa.me/61451747228" target="_blank" rel="noopener noreferrer"
              style={{ display:"inline-flex", alignItems:"center", gap:8, backgroundColor:"#FFFFFF", borderRadius:6, padding:"10px 12px", textDecoration:"none" }}>
              <FaWhatsapp size={18} color="#103178" />
              <span style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontWeight:600, fontSize:"16px", lineHeight:"100%", color:"#103178" }}>Order Here</span>
            </a>
          </div>

          {/* Contact label */}
          <p className="promo-contact" style={{ fontFamily:"'Inter', sans-serif", fontWeight:400, color:"#FFFFFF" }}>
            Or get in touch with our team directly:
          </p>

          {/* Email */}
          <a href="mailto:sales@sagegaming.com.au" className="promo-contact-link" style={{ display:"flex", alignItems:"center", gap:8, fontFamily:"'Inter', sans-serif", fontWeight:400, color:"#FFFFFF", textDecoration:"none" }}>
            <Mail size={16} color="#FFFFFF" />
            sales@sagegaming.com.au
          </a>

          {/* Phone */}
          <a href="tel:+61451747228" className="promo-contact-link promo-phone" style={{ display:"flex", alignItems:"center", gap:8, fontFamily:"'Inter', sans-serif", fontWeight:400, color:"#FFFFFF", textDecoration:"none" }}>
            <Phone size={16} color="#FFFFFF" />
            +61 451 747 228
          </a>

          {/* Divider */}
          <div className="promo-divider" style={{ width:50, height:0, borderTop:"1px solid #FFFFFF" }} />

          {/* Social icons */}
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            {[
              { href:"https://www.facebook.com/sagegaming2022", icon:<RiFacebookFill size={18} />, label:"Facebook" },
              { href:"https://x.com/sagegaming2022",            icon:<BsTwitterX size={18} />,    label:"X/Twitter" },
              { href:"https://www.tiktok.com/@sagegaming2022",  icon:<BiLogoTiktok size={18} />,  label:"TikTok" },
            ].map(({ href, icon, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                style={{ display:"flex", alignItems:"center", justifyContent:"center", width:36, height:36, borderRadius:50, padding:9, backgroundColor:"#FFFFFF", color:"#000", flexShrink:0 }}>
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── z=5  Footer ── */}
      <div style={{ position:"absolute", bottom:FOOTER_PB, left: cfg.px, zIndex:5 }}>
        <p style={{ fontFamily:"'Inter', sans-serif", fontWeight:400, fontSize:"16px", color:"#FFFFFF" }}>
          Powered by <a href="https://xprogroup.com.au/" target="_blank" rel="noopener noreferrer" style={{ fontWeight:700, color:"#FFFFFF", textDecoration:"none" }}>Xpro Group</a>
        </p>
      </div>

      <style jsx global>{`
        /* ─── Logo ─── */
        .promo-logo-wrap  { padding: 16px 20px; }
        .promo-logo-img   { width: 30px !important; height: 35px !important; }
        .promo-logo-text  { font-size: 22px; }

        @media (min-width: 640px) {
          .promo-logo-wrap  { padding: 20px 28px; }
          .promo-logo-img   { width: 34px !important; height: 40px !important; }
          .promo-logo-text  { font-size: 26px; }
        }
        @media (min-width: 1024px) {
          .promo-logo-wrap  { padding: 24px 32px; }
          .promo-logo-img   { width: 38px !important; height: 44px !important; }
          .promo-logo-text  { font-size: 30px; }
        }

        /* ─── Title ─── */
        .promo-title {
          font-size: clamp(28px, 7vw, 64px);
          line-height: 1.12;
          margin-bottom: clamp(10px, 2vh, 16px);
        }

        /* ─── Description ─── */
        .promo-desc {
          font-size: clamp(13px, 1.6vw, 16px);
          line-height: 1.5;
          margin-bottom: clamp(12px, 2.5vh, 24px);
        }

        /* ─── Button wrapper ─── */
        .promo-btn-wrap { margin-bottom: clamp(12px, 2.5vh, 20px); }

        /* ─── Contact ─── */
        .promo-contact {
          font-size: clamp(12px, 1.5vw, 16px);
          margin-bottom: 6px;
        }
        .promo-contact-link {
          font-size: clamp(12px, 1.5vw, 16px);
          margin-bottom: 4px;
        }
        .promo-phone { margin-bottom: clamp(12px, 2.5vh, 20px); }

        /* ─── Divider ─── */
        .promo-divider { margin-bottom: clamp(12px, 2.5vh, 20px); }

        /* ─── Scroll animation ─── */
        @keyframes scrollLeft {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-${BG_IMAGES.length * (BREAKPOINTS.lg.w + 8)}px); }
        }
        @media (max-width: 639px) {
          @keyframes scrollLeft {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-${BG_IMAGES.length * (BREAKPOINTS.sm.w + 8)}px); }
          }
        }
        @media (min-width: 640px) and (max-width: 1023px) {
          @keyframes scrollLeft {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-${BG_IMAGES.length * (BREAKPOINTS.md.w + 8)}px); }
          }
        }
      `}</style>
    </div>
  );
}
