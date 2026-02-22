"use client";

interface ProgressBarProps {
  progress: number;
  color?: string;
  height?: number;
  showLabel?: boolean;
  animate?: boolean;
}

export default function ProgressBar({
  progress,
  color = "#e8a020",
  height = 5,
  showLabel = false,
  animate = true,
}: ProgressBarProps) {
  return (
    <div style={{ width: "100%" }}>
      {showLabel && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--text3)",
              fontFamily: "'DM Mono', monospace",
            }}
          >
            Progress
          </span>
          <span
            style={{
              fontSize: 13,
              fontWeight: 700,
              fontFamily: "'DM Mono', monospace",
              color: "var(--text)",
            }}
          >
            {progress}%
          </span>
        </div>
      )}

      <div
        style={{
          width: "100%",
          height,
          background: "var(--bg3)",
          borderRadius: 999,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            borderRadius: 999,
            background: `linear-gradient(90deg, ${color}88 0%, ${color} 100%)`,
            animation: animate ? "progressIn 1s cubic-bezier(.4,0,.2,1) both" : undefined,
            transition: "width 0.6s cubic-bezier(.4,0,.2,1)",
          }}
        />
      </div>
    </div>
  );
}