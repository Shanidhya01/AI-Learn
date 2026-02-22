"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import CourseCard from "@/components/CourseCard";
import Skeleton from "@/components/Skeleton";
import DarkToggle from "@/components/DarkToggle";
import coursesData from "@/data/courses.json";

interface Course {
  id: number;
  title: string;
  progress: number;
  category: string;
  tag: string;
  color: string;
  icon: string;
  lessons: { id: number; title: string; duration: string }[];
}

function StatCard({
  value,
  label,
  accent,
  delay,
}: {
  value: string | number;
  label: string;
  accent: string;
  delay: number;
}) {
  return (
    <div
      style={{
        background: "var(--surface)",
        border: "1.5px solid var(--border)",
        borderRadius: 16,
        padding: "22px 24px",
        position: "relative",
        overflow: "hidden",
        animation: `fadeUp 0.5s ease both`,
        animationDelay: `${delay}ms`,
      }}
    >
      {/* Top accent line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: accent,
          borderRadius: "16px 16px 0 0",
        }}
      />
      {/* Soft glow */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 60,
          background: `linear-gradient(180deg, ${accent}0e, transparent)`,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          fontSize: 34,
          fontWeight: 800,
          letterSpacing: "-0.05em",
          color: "var(--text)",
          lineHeight: 1,
          marginBottom: 6,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--text3)",
          fontFamily: "'DM Mono', monospace",
        }}
      >
        {label}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [data, setData] = useState<Course[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchFocused, setSearchFocused] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      const courses = (coursesData as Course[]).map((course) => {
        const saved = localStorage.getItem(`course-progress-${course.id}`);
        if (saved) {
          try {
            const completedIds: number[] = JSON.parse(saved);
            const progress = Math.round(
              (completedIds.length / course.lessons.length) * 100
            );
            return { ...course, progress };
          } catch {}
        }
        return course;
      });
      setData(courses);
      setLoading(false);
    }, 1300);
    return () => clearTimeout(t);
  }, []);

  const filtered = data.filter(
    (c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase()) ||
      c.tag.toLowerCase().includes(search.toLowerCase())
  );

  const avgProgress = data.length
    ? Math.round(data.reduce((a, c) => a + c.progress, 0) / data.length)
    : 0;
  const completed = data.filter((c) => c.progress === 100).length;
  const inProgress = data.filter((c) => c.progress > 0 && c.progress < 100).length;

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg)" }}>
      <Navbar />

      <main
        style={{
          marginLeft: 248,
          flex: 1,
          padding: "32px 36px 48px",
          minHeight: "100vh",
        }}
      >
        {/* ── Topbar ── */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: 32,
            animation: "fadeUp 0.4s ease both",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: 28,
                fontWeight: 800,
                letterSpacing: "-0.04em",
                color: "var(--text)",
                lineHeight: 1.1,
                marginBottom: 5,
              }}
            >
              Good morning, Alex 👋
            </h1>
            <p
              style={{
                fontSize: 13,
                color: "var(--text2)",
                fontFamily: "'DM Mono', monospace",
              }}
            >
              {loading
                ? "Loading your courses…"
                : `${inProgress} course${inProgress !== 1 ? "s" : ""} in progress`}
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* Search */}
            <div style={{ position: "relative" }}>
              <span
                style={{
                  position: "absolute",
                  left: 13,
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: 15,
                  color: "var(--text3)",
                  pointerEvents: "none",
                  userSelect: "none",
                }}
              >
                ⌕
              </span>
              <input
                placeholder="Search courses…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                style={{
                  padding: "10px 16px 10px 36px",
                  background: "var(--surface)",
                  border: `1.5px solid ${searchFocused ? "#e8a020" : "var(--border)"}`,
                  borderRadius: 10,
                  color: "var(--text)",
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 13,
                  outline: "none",
                  width: 240,
                  transition: "border-color 0.2s, box-shadow 0.2s",
                  boxShadow: searchFocused
                    ? "0 0 0 3px rgba(232,160,32,0.1)"
                    : "none",
                }}
              />
            </div>

            <DarkToggle />
          </div>
        </div>

        {/* ── Stats ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
            marginBottom: 36,
          }}
        >
          <StatCard value={data.length} label="Total Courses" accent="#e8a020" delay={60} />
          <StatCard value={`${avgProgress}%`} label="Avg. Progress" accent="#0fb57a" delay={120} />
          <StatCard value={completed} label="Completed" accent="#5b5fc7" delay={180} />
        </div>

        {/* ── Section header ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 20,
            animation: "fadeUp 0.5s ease both",
            animationDelay: "200ms",
          }}
        >
          <h2
            style={{
              fontSize: 15,
              fontWeight: 800,
              letterSpacing: "-0.01em",
              color: "var(--text)",
            }}
          >
            Your Courses
          </h2>
          <span
            style={{
              fontSize: 12,
              color: "var(--text3)",
              fontFamily: "'DM Mono', monospace",
            }}
          >
            {loading ? "…" : `${filtered.length} / ${data.length}`}
          </span>
        </div>

        {/* ── Grid ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 20,
          }}
        >
          {loading ? (
            Array(3)
              .fill(0)
              .map((_, i) => <Skeleton key={i} />)
          ) : filtered.length > 0 ? (
            filtered.map((course, i) => (
              <CourseCard key={course.id} course={course} delay={i * 80} />
            ))
          ) : (
            <div
              style={{
                gridColumn: "1 / -1",
                textAlign: "center",
                padding: "64px 20px",
                color: "var(--text3)",
              }}
            >
              <div style={{ fontSize: 44, marginBottom: 14 }}>◎</div>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: "var(--text2)",
                  marginBottom: 6,
                }}
              >
                No courses found
              </div>
              <div
                style={{
                  fontSize: 12,
                  fontFamily: "'DM Mono', monospace",
                }}
              >
                Try a different search term
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}