"use client";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import ProgressBar from "@/components/ProgressBar";
import DarkToggle from "@/components/DarkToggle";
import coursesData from "@/data/courses.json";

interface Lesson {
  id: number;
  title: string;
  duration: string;
}

interface Course {
  id: number;
  title: string;
  progress: number;
  category: string;
  tag: string;
  color: string;
  icon: string;
  description: string;
  lessons: Lesson[];
}

function LessonRow({
  lesson,
  index,
  done,
  onToggle,
  color,
}: {
  lesson: Lesson;
  index: number;
  done: boolean;
  onToggle: () => void;
  color: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onToggle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "15px 20px",
        background: done ? "var(--bg3)" : hovered ? "var(--surface)" : "var(--surface)",
        border: `1.5px solid ${hovered && !done ? color + "55" : "var(--border)"}`,
        borderRadius: 13,
        cursor: "pointer",
        transition: "all 0.18s",
        opacity: done ? 0.65 : 1,
        animation: "fadeUp 0.35s ease both",
        animationDelay: `${index * 55}ms`,
        transform: hovered && !done ? "translateX(3px)" : "none",
      }}
    >
      {/* Checkbox */}
      <div
        style={{
          width: 24,
          height: 24,
          borderRadius: "50%",
          border: `2px solid ${done ? color : "var(--border2)"}`,
          background: done ? color : "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          transition: "all 0.2s",
          fontSize: 12,
          color: "#fff",
          fontWeight: 800,
        }}
      >
        {done && "✓"}
      </div>

      {/* Number */}
      <span
        style={{
          fontSize: 10,
          fontWeight: 700,
          fontFamily: "'DM Mono', monospace",
          color: "var(--text3)",
          minWidth: 22,
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Title */}
      <span
        style={{
          flex: 1,
          fontSize: 14,
          fontWeight: 600,
          color: done ? "var(--text3)" : "var(--text)",
          textDecoration: done ? "line-through" : "none",
          transition: "color 0.2s",
        }}
      >
        {lesson.title}
      </span>

      {/* Duration */}
      <span
        style={{
          fontSize: 11,
          color: "var(--text3)",
          fontFamily: "'DM Mono', monospace",
          flexShrink: 0,
        }}
      >
        {lesson.duration}
      </span>

      {/* Arrow */}
      <span
        style={{
          fontSize: 14,
          color: done ? color : "var(--text3)",
          transition: "transform 0.18s, color 0.18s",
          transform: hovered ? "translateX(2px)" : "none",
          flexShrink: 0,
        }}
      >
        {done ? "✓" : "›"}
      </span>
    </div>
  );
}

export default function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const course = (coursesData as Course[]).find(
    (c) => c.id === parseInt(id)
  );

  const initCompleted = (): Set<number> => {
    if (!course) return new Set();
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(`course-progress-${course.id}`);
      if (saved) {
        try {
          return new Set(JSON.parse(saved) as number[]);
        } catch {}
      }
    }
    const count = Math.round((course.progress / 100) * course.lessons.length);
    return new Set(course.lessons.slice(0, count).map((l) => l.id));
  };

  const [completed, setCompleted] = useState<Set<number>>(initCompleted);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Persist completed lessons to localStorage
  useEffect(() => {
    if (!course) return;
    localStorage.setItem(
      `course-progress-${course.id}`,
      JSON.stringify(Array.from(completed))
    );
  }, [completed, course]);

  if (!course)
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          color: "var(--text2)",
          fontFamily: "'DM Mono', monospace",
          fontSize: 14,
        }}
      >
        Course not found.
      </div>
    );

  const toggle = (id: number) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const progress = Math.round((completed.size / course.lessons.length) * 100);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg)" }}>
      <Navbar />

      <main
        style={{
          marginLeft: 248,
          flex: 1,
          padding: "32px 36px 64px",
          minHeight: "100vh",
        }}
      >
        {/* Topbar */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: 24,
          }}
        >
          <DarkToggle />
        </div>

        {/* Back */}
        <button
          onClick={() => router.back()}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 7,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--text3)",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "0 0 28px",
            fontFamily: "'Syne', sans-serif",
            transition: "color 0.18s",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.color = "#e8a020")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.color = "var(--text3)")
          }
        >
          ← Back to Dashboard
        </button>

        {/* Hero card */}
        <div
          style={{
            background: "var(--surface)",
            border: "1.5px solid var(--border)",
            borderRadius: 22,
            padding: "36px 40px",
            marginBottom: 28,
            position: "relative",
            overflow: "hidden",
            animation: "fadeUp 0.45s ease both",
          }}
        >
          {/* Background glow */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `radial-gradient(ellipse at 85% 0%, ${course.color}14, transparent 55%)`,
              pointerEvents: "none",
            }}
          />
          {/* Large icon watermark */}
          <div
            style={{
              position: "absolute",
              right: 40,
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: 90,
              color: course.color,
              opacity: 0.07,
              fontWeight: 100,
              userSelect: "none",
            }}
          >
            {course.icon}
          </div>

          <div style={{ position: "relative", zIndex: 1 }}>
            {/* Tag */}
            <span
              style={{
                display: "inline-block",
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: course.color,
                background: `${course.color}16`,
                padding: "5px 13px",
                borderRadius: 999,
                marginBottom: 18,
              }}
            >
              {course.tag} · {course.category}
            </span>

            {/* Title */}
            <h1
              style={{
                fontSize: 34,
                fontWeight: 800,
                letterSpacing: "-0.045em",
                color: "var(--text)",
                lineHeight: 1.1,
                marginBottom: 10,
                maxWidth: 540,
              }}
            >
              {course.title}
            </h1>

            {/* Description */}
            <p
              style={{
                fontSize: 13,
                color: "var(--text2)",
                fontFamily: "'DM Mono', monospace",
                lineHeight: 1.7,
                marginBottom: 28,
                maxWidth: 480,
              }}
            >
              {course.description}
            </p>

            {/* Progress row */}
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <div style={{ flex: 1, maxWidth: 400 }}>
                <ProgressBar
                  progress={progress}
                  color={course.color}
                  height={8}
                  showLabel
                  animate={mounted}
                />
              </div>
            </div>

            {/* Meta row */}
            <div
              style={{
                display: "flex",
                gap: 28,
                marginTop: 20,
              }}
            >
              {[
                { label: "Lessons", value: course.lessons.length },
                { label: "Completed", value: completed.size },
                {
                  label: "Remaining",
                  value: course.lessons.length - completed.size,
                },
              ].map((m) => (
                <div key={m.label}>
                  <div
                    style={{
                      fontSize: 20,
                      fontWeight: 800,
                      fontFamily: "'DM Mono', monospace",
                      color: "var(--text)",
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {m.value}
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--text3)",
                    }}
                  >
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Lessons header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 16,
            animation: "fadeUp 0.5s ease both",
            animationDelay: "100ms",
          }}
        >
          <h2
            style={{
              fontSize: 15,
              fontWeight: 800,
              color: "var(--text)",
            }}
          >
            Lessons
          </h2>
          <span
            style={{
              fontSize: 11,
              color: "var(--text3)",
              fontFamily: "'DM Mono', monospace",
            }}
          >
            Click any lesson to toggle
          </span>
        </div>

        {/* Lessons list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {course.lessons.map((lesson, i) => (
            <LessonRow
              key={lesson.id}
              lesson={lesson}
              index={i}
              done={completed.has(lesson.id)}
              onToggle={() => toggle(lesson.id)}
              color={course.color}
            />
          ))}
        </div>
      </main>
    </div>
  );
}