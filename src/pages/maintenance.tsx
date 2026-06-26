import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import { RiFacebookFill } from "react-icons/ri";
import { BsTwitterX } from "react-icons/bs";
import { BiLogoTiktok } from "react-icons/bi";

export default function MaintenancePage() {
  return (
    <div
      className="relative min-h-screen w-full flex flex-col"
      style={{
        backgroundImage: "url('/maintenance-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.45)",
          zIndex: 0,
        }}
      />
      <div className="relative flex flex-col flex-1" style={{ zIndex: 1 }}>
      {/* Header - Logo */}
      <div className="flex items-center justify-center gap-3 pt-8">
        <Image src="/sage-logo.png" alt="Sage Logo" width={48} height={48} />
        <span
          style={{
            fontFamily: "'Jost', sans-serif",
            fontWeight: 600,
            fontSize: "30px",
            color: "#FFFFFF",
          }}
        >
          Sage Gaming
        </span>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
        {/* Title */}
        <h1
          style={{
            fontFamily: "'Jost', sans-serif",
            fontWeight: 500,
            fontSize: "64px",
            color: "#FFFFFF",
            marginBottom: "24px",
            lineHeight: 1.1,
          }}
        >
          We Are Under Maintenance
        </h1>

        {/* Description */}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: "18px",
            color: "#FFFFFF",
            maxWidth: "580px",
            marginBottom: "8px",
          }}
        >
          Our website is currently undergoing scheduled maintenance to enhance
          performance and reliability. Service will be back{" "}
          <span style={{ fontWeight: 600 }}>online shortly.</span>
        </p>

        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: "18px",
            color: "#FFFFFF",
            marginBottom: "24px",
          }}
        >
          Thank you for your patience.
        </p>

        {/* Contact */}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: "16px",
            color: "#FFFFFF",
            marginBottom: "12px",
          }}
        >
          Need something urgent? Please contact our team:
        </p>

        <div className="flex flex-col items-center gap-2 mb-6">
          <a
            href="mailto:sales@sagegaming.com.au"
            className="flex items-center gap-2"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: "16px",
              color: "#FFFFFF",
              textDecoration: "none",
            }}
          >
            <Mail size={16} color="#FFFFFF" />
            sales@sagegaming.com.au
          </a>
          <a
            href="tel:+61451747228"
            className="flex items-center gap-2"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: "16px",
              color: "#FFFFFF",
              textDecoration: "none",
            }}
          >
            <Phone size={16} color="#FFFFFF" />
            +61 451 747 228
          </a>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-4">
          <a
            href="https://www.facebook.com/sagegaming2022"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#FFFFFF",
              borderRadius: "100px",
              padding: "16px",
              color: "#000",
            }}
          >
            <RiFacebookFill size={20} />
          </a>
          <a
            href="https://x.com/sagegaming2022"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#FFFFFF",
              borderRadius: "100px",
              padding: "16px",
              color: "#000",
            }}
          >
            <BsTwitterX size={20} />
          </a>
          <a
            href="https://www.tiktok.com/@sagegaming2022"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#FFFFFF",
              borderRadius: "100px",
              padding: "16px",
              color: "#000",
            }}
          >
            <BiLogoTiktok size={20} />
          </a>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-center pb-6">
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: "16px",
            color: "#FFFFFF",
          }}
        >
          Powered by{" "}
          <span style={{ fontWeight: 700 }}>Xpro Group</span>
        </p>
      </div>
      </div>
    </div>
  );
}
