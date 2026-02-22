"use client";
import { useState } from "react";
import Link from "next/link";
import ProgressBar from "./ProgressBar";

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

interface CourseCardProps {
  course: Course;
  delay?: number;
}

function getStatusLabel(progress: number) {
  if (progress === 100) return { label: "Completed", color: "#0fb57a" };
  if (progress >= 60) return { label: "In Progress", color: "#e8a020" };
  return { label: "Just Started", color: "#5b5fc7" };
}

export default function CourseCard({ course, delay = 0 }: CourseCardProps) {
  const [hovered, setHovered] = useState(false);
  const { label, color: statusColor } = getStatusLabel(course.progress);

  return (
    <Link href={`/course/${course.id}`} style={{ textDecoration: "none" }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: "var(--surface)",
          border: `1.5px solid ${hovered ? course.color : "var(--border)"}`,
          borderRadius: 18,
          padding: 24,
          cursor: "pointer",
          transition: "all 0.22s cubic-bezier(.4,0,.2,1)",
          transform: hovered ? "translateY(-4px)" : "translateY(0)",
          boxShadow: hovered
            ? `0 16px 40px ${course.color}22`
            : "var(--shadow-sm)",
          position: "relative",
          overflow: "hidden",
          animation: `fadeUp 0.45s ease both`,
          animationDelay: `${delay}ms`,
          height: "100%",
        }}
      >
        {/* Glow corner */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 110,
            height: 110,
            background: `radial-gradient(circle at top right, ${course.color}22, transparent 70%)`,
            borderRadius: "0 18px 0 100%",
            opacity: hovered ? 1 : 0.4,
            transition: "opacity 0.3s",
            pointerEvents: "none",
          }}
        />

        {/* Top row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 16,
          }}
        >
          <span
            style={{
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: course.color,
              background: `${course.color}16`,
              padding: "4px 11px",
              borderRadius: 999,
            }}
          >
            {course.tag}
          </span>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              background: `${course.color}14`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              color: course.color,
              transition: "transform 0.2s",
              transform: hovered ? "rotate(-8deg) scale(1.1)" : "none",
            }}
          >
            {course.icon}
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 17,
            fontWeight: 800,
            letterSpacing: "-0.025em",
            color: "var(--text)",
            marginBottom: 5,
            lineHeight: 1.25,
          }}
        >
          {course.title}
        </div>
        <div
          style={{
            fontSize: 11,
            color: "var(--text3)",
            fontFamily: "'DM Mono', monospace",
            marginBottom: 20,
          }}
        >
          {course.lessons.length} lessons · {course.category}
        </div>

        {/* Progress */}
        <ProgressBar progress={course.progress} color={course.color} height={5} />

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: statusColor,
            }}
          >
            {label}
          </span>
          <span
            style={{
              fontSize: 14,
              fontWeight: 800,
              fontFamily: "'DM Mono', monospace",
              color: "var(--text2)",
            }}
          >
            {course.progress}%
          </span>
        </div>
      </div>
    </Link>
  );
}