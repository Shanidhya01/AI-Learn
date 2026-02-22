"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DarkToggle from "./DarkToggle";

const NAV_ITEMS = [
  { href: "/dashboard", icon: "◧", label: "Dashboard" },
  { href: "/dashboard", icon: "⊞", label: "Courses" },
  { href: "/dashboard", icon: "◎", label: "Progress" },
  { href: "/dashboard", icon: "⊛", label: "Settings" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <aside
      style={{
        width: 248,
        minHeight: "100vh",
        background: "var(--sidebar-bg)",
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: 100,
        transition: "background 0.35s",
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: "28px 24px 22px",
          borderBottom: "1px solid var(--sidebar-brd)",
          marginBottom: 8,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 2,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: "#e8a020",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
              fontWeight: 800,
              color: "#111009",
            }}
          >
            ◈
          </div>
          <span
            style={{
              fontSize: 18,
              fontWeight: 800,
              color: "var(--sidebar-txt)",
              letterSpacing: "-0.03em",
            }}
          >
            AI·Learn
          </span>
        </div>
        <div
          style={{
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "var(--sidebar-mut)",
            fontFamily: "'DM Mono', monospace",
            paddingLeft: 42,
          }}
        >
          Learning Platform
        </div>
      </div>

      {/* Nav section label */}
      <div
        style={{
          fontSize: 9,
          fontWeight: 700,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--sidebar-mut)",
          padding: "12px 24px 6px",
        }}
      >
        Menu
      </div>

      {/* Nav items */}
      {NAV_ITEMS.map((item, i) => {
        const active =
          item.href === "/dashboard"
            ? pathname?.startsWith("/dashboard") || pathname?.startsWith("/course")
            : pathname === item.href;

        return (
          <Link
            key={i}
            href={item.href}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 16px",
              margin: "1px 8px",
              borderRadius: 9,
              textDecoration: "none",
              color:
                i === 0 && active
                  ? "#e8a020"
                  : "var(--sidebar-mut)",
              fontSize: 13,
              fontWeight: 600,
              background:
                i === 0 && active
                  ? "rgba(232,160,32,0.08)"
                  : "transparent",
              transition: "all 0.18s",
            }}
            onMouseEnter={(e) => {
              if (!(i === 0 && active)) {
                (e.currentTarget as HTMLElement).style.background =
                  "rgba(255,255,255,0.05)";
                (e.currentTarget as HTMLElement).style.color =
                  "var(--sidebar-txt)";
              }
            }}
            onMouseLeave={(e) => {
              if (!(i === 0 && active)) {
                (e.currentTarget as HTMLElement).style.background =
                  "transparent";
                (e.currentTarget as HTMLElement).style.color =
                  "var(--sidebar-mut)";
              }
            }}
          >
            <span style={{ fontSize: 17, width: 22, textAlign: "center" }}>
              {item.icon}
            </span>
            {item.label}
          </Link>
        );
      })}

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Bottom user */}
      <div
        style={{
          padding: "16px 20px",
          borderTop: "1px solid var(--sidebar-brd)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #e8a020, #e8503a)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 13,
              fontWeight: 800,
              color: "#fff",
              flexShrink: 0,
            }}
          >
            AK
          </div>
          <div>
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "var(--sidebar-txt)",
                lineHeight: 1.2,
              }}
            >
              Alex Kim
            </div>
            <div
              style={{
                fontSize: 10,
                color: "var(--sidebar-mut)",
                fontFamily: "'DM Mono', monospace",
              }}
            >
              Pro Learner
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}