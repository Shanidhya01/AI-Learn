"use client";
import { useTheme } from "@/context/ThemeContext";

export default function DarkToggle() {
  const { dark, toggleDark } = useTheme();

  return (
    <button
      onClick={toggleDark}
      title="Toggle theme"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "9px 16px",
        background: "var(--surface)",
        border: "1.5px solid var(--border)",
        borderRadius: 10,
        color: "var(--text2)",
        fontFamily: "'Syne', sans-serif",
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: "0.04em",
        cursor: "pointer",
        transition: "all 0.18s",
        whiteSpace: "nowrap",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "#e8a020";
        e.currentTarget.style.color = "#e8a020";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.style.color = "var(--text2)";
      }}
    >
      <span style={{ fontSize: 15 }}>{dark ? "☀︎" : "☽"}</span>
      {dark ? "Light Mode" : "Dark Mode"}
    </button>
  );
}