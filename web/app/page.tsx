"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import DarkToggle from "@/components/DarkToggle";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard");
    }, 900);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        background: "var(--bg)",
      }}
    >
      {/* ── Art Panel ── */}
      <div
        style={{
          width: "44%",
          minHeight: "100vh",
          background: "#0a0908",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "48px 44px",
          flexShrink: 0,
        }}
      >
        {/* Grid texture */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />

        {/* Floating orbs */}
        {[
          { w: 320, h: 320, top: "8%", left: "10%", bg: "rgba(232,160,32,0.13)", delay: "0s" },
          { w: 220, h: 220, top: "55%", right: "0%", bg: "rgba(91,95,199,0.11)", delay: "2.5s" },
          { w: 160, h: 160, top: "35%", right: "20%", bg: "rgba(15,181,122,0.09)", delay: "4s" },
        ].map((orb, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: orb.w,
              height: orb.h,
              top: orb.top,
              left: (orb as any).left,
              right: (orb as any).right,
              borderRadius: "50%",
              background: orb.bg,
              filter: "blur(55px)",
              animation: `orbFloat 7s ease-in-out infinite`,
              animationDelay: orb.delay,
            }}
          />
        ))}

        {/* Corner badge */}
        <div
          style={{
            position: "absolute",
            top: 28,
            left: 28,
            display: "flex",
            alignItems: "center",
            gap: 8,
            zIndex: 2,
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 7,
              background: "#e8a020",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
              color: "#0a0908",
              fontWeight: 800,
            }}
          >
            ◈
          </div>
          <span
            style={{
              fontSize: 14,
              fontWeight: 800,
              color: "#e8e0d0",
              letterSpacing: "-0.02em",
            }}
          >
            AI·Learn
          </span>
        </div>

        {/* Headline */}
        <div style={{ position: "relative", zIndex: 2 }}>
          <div
            style={{
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#e8a020",
              fontFamily: "'DM Mono', monospace",
              marginBottom: 18,
            }}
          >
            The Future of Learning
          </div>
          <h1
            style={{
              fontSize: 40,
              fontWeight: 800,
              letterSpacing: "-0.045em",
              lineHeight: 1.08,
              color: "#f0ede5",
              marginBottom: 20,
            }}
          >
            Your next<br />
            breakthrough<br />
            <span style={{ color: "#e8a020" }}>starts here.</span>
          </h1>
          <p
            style={{
              fontSize: 13,
              color: "#525048",
              fontFamily: "'DM Mono', monospace",
              lineHeight: 1.8,
              maxWidth: 280,
            }}
          >
            AI-curated paths designed to take you from curious to competent — one lesson at a time.
          </p>

          {/* Social proof */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginTop: 32,
            }}
          >
            <div style={{ display: "flex" }}>
              {["#e8a020", "#0fb57a", "#5b5fc7", "#e8503a"].map((c, i) => (
                <div
                  key={i}
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: c,
                    border: "2px solid #0a0908",
                    marginLeft: i === 0 ? 0 : -8,
                    fontSize: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontWeight: 800,
                  }}
                >
                  {["AK", "ML", "SR", "+"][i]}
                </div>
              ))}
            </div>
            <span
              style={{
                fontSize: 12,
                color: "#484640",
                fontFamily: "'DM Mono', monospace",
              }}
            >
              2,400+ learners enrolled
            </span>
          </div>
        </div>
      </div>

      {/* ── Form Side ── */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px 40px",
          position: "relative",
        }}
      >
        {/* Dark toggle top right */}
        <div style={{ position: "absolute", top: 24, right: 24 }}>
          <DarkToggle />
        </div>

        <div
          style={{
            width: "100%",
            maxWidth: 380,
            animation: "fadeUp 0.5s ease both",
          }}
        >
          {/* Heading */}
          <div style={{ marginBottom: 36 }}>
            <h2
              style={{
                fontSize: 30,
                fontWeight: 800,
                letterSpacing: "-0.04em",
                color: "var(--text)",
                marginBottom: 7,
              }}
            >
              Welcome back
            </h2>
            <p
              style={{
                fontSize: 13,
                color: "var(--text2)",
                fontFamily: "'DM Mono', monospace",
              }}
            >
              Sign in to continue your learning journey
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <label
              style={{
                display: "block",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--text2)",
                marginBottom: 8,
              }}
            >
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "13px 16px",
                background: "var(--bg3)",
                border: "1.5px solid var(--border)",
                borderRadius: 11,
                color: "var(--text)",
                fontFamily: "'DM Mono', monospace",
                fontSize: 14,
                outline: "none",
                marginBottom: 18,
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#e8a020";
                e.target.style.boxShadow = "0 0 0 3px rgba(232,160,32,0.12)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "var(--border)";
                e.target.style.boxShadow = "none";
              }}
            />

            {/* Password */}
            <label
              style={{
                display: "block",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--text2)",
                marginBottom: 8,
              }}
            >
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "13px 16px",
                background: "var(--bg3)",
                border: "1.5px solid var(--border)",
                borderRadius: 11,
                color: "var(--text)",
                fontFamily: "'DM Mono', monospace",
                fontSize: 14,
                outline: "none",
                marginBottom: 6,
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#e8a020";
                e.target.style.boxShadow = "0 0 0 3px rgba(232,160,32,0.12)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "var(--border)";
                e.target.style.boxShadow = "none";
              }}
            />

            {/* Error */}
            {error && (
              <p
                style={{
                  fontSize: 12,
                  color: "#e8503a",
                  fontFamily: "'DM Mono', monospace",
                  marginBottom: 14,
                  marginTop: 4,
                }}
              >
                ⚠ {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "14px",
                marginTop: 18,
                background: loading ? "var(--border2)" : "#111009",
                color: loading ? "var(--text3)" : "#f5f3ee",
                border: "none",
                borderRadius: 11,
                fontFamily: "'Syne', sans-serif",
                fontSize: 14,
                fontWeight: 800,
                letterSpacing: "0.04em",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  (e.currentTarget as HTMLElement).style.opacity = "0.85";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                }
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = "1";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              {loading ? (
                <>
                  <div
                    style={{
                      width: 14,
                      height: 14,
                      borderRadius: "50%",
                      border: "2px solid var(--text3)",
                      borderTopColor: "var(--text)",
                      animation: "spin 0.7s linear infinite",
                    }}
                  />
                  Signing in…
                </>
              ) : (
                "Continue →"
              )}
            </button>
          </form>

          <p
            style={{
              textAlign: "center",
              marginTop: 22,
              fontSize: 11,
              color: "var(--text3)",
              fontFamily: "'DM Mono', monospace",
            }}
          >
            No account required — enter any credentials
          </p>
        </div>
      </div>
    </div>
  );
}