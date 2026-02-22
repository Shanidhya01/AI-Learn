"use client";

function SkeletonBlock({
  width = "100%",
  height = 14,
  radius = 6,
  style = {},
}: {
  width?: string | number;
  height?: number;
  radius?: number;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        width,
        height,
        borderRadius: radius,
        background:
          "linear-gradient(90deg, var(--bg3) 25%, var(--border) 50%, var(--bg3) 75%)",
        backgroundSize: "1600px 100%",
        animation: "shimmer 1.5s infinite",
        ...style,
      }}
    />
  );
}

export default function Skeleton() {
  return (
    <div
      style={{
        background: "var(--surface)",
        border: "1.5px solid var(--border)",
        borderRadius: 18,
        padding: 24,
      }}
    >
      {/* Tag + icon row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 18,
        }}
      >
        <SkeletonBlock width={56} height={22} radius={999} />
        <SkeletonBlock width={38} height={38} radius={10} />
      </div>

      {/* Title */}
      <SkeletonBlock width="72%" height={18} style={{ marginBottom: 8 }} />
      <SkeletonBlock width="48%" height={12} radius={4} style={{ marginBottom: 22 }} />

      {/* Progress bar */}
      <SkeletonBlock width="100%" height={5} radius={999} style={{ marginBottom: 12 }} />

      {/* Footer */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <SkeletonBlock width={72} height={11} radius={4} />
        <SkeletonBlock width={36} height={11} radius={4} />
      </div>
    </div>
  );
}