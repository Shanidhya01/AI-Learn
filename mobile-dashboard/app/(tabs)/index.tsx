import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Animated,
  Pressable,
  Dimensions,
  StatusBar,
} from "react-native";
import Svg, { Circle } from "react-native-svg";
import { useFonts, Syne_700Bold, Syne_800ExtraBold } from "@expo-google-fonts/syne";
import { SpaceMono_400Regular, SpaceMono_700Bold } from "@expo-google-fonts/space-mono";

const { width } = Dimensions.get("window");

const COURSES = [
  {
    id: 1,
    title: "AI Fundamentals",
    subtitle: "Neural nets, embeddings & beyond",
    progress: 60,
    color: "#FF6B35",
    lessons: 24,
    completed: 14,
    tag: "IN PROGRESS",
  },
  {
    id: 2,
    title: "Machine Learning Basics",
    subtitle: "Supervised, unsupervised & reinforcement",
    progress: 20,
    color: "#00D9C0",
    lessons: 18,
    completed: 4,
    tag: "JUST STARTED",
  },
  {
    id: 3,
    title: "React for Beginners",
    subtitle: "Components, hooks & state mastery",
    progress: 90,
    color: "#A855F7",
    lessons: 30,
    completed: 27,
    tag: "ALMOST DONE",
  },
];

// Animated SVG circle progress ring
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

function ProgressRing({
  progress,
  color,
  size = 64,
}: {
  progress: number;
  color: string;
  size?: number;
}) {
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const animatedProgress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedProgress, {
      toValue: progress,
      duration: 1400,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const strokeDashoffset = animatedProgress.interpolate({
    inputRange: [0, 100],
    outputRange: [circumference, 0],
  });

  return (
    <View style={{ width: size, height: size, alignItems: "center", justifyContent: "center" }}>
      <Svg width={size} height={size} style={{ position: "absolute", transform: [{ rotate: "-90deg" }] }}>
        {/* Track */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#2a2a2a"
          strokeWidth={strokeWidth}
        />
        {/* Progress */}
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
        />
      </Svg>
      <Text style={[styles.ringLabel, { color }]}>{progress}%</Text>
    </View>
  );
}

function CourseCard({
  course,
  index,
}: {
  course: (typeof COURSES)[0];
  index: number;
}) {
  const slideAnim = useRef(new Animated.Value(40)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const barAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        delay: index * 130,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 500,
        delay: index * 130,
        useNativeDriver: true,
      }),
      Animated.timing(barAnim, {
        toValue: course.progress,
        duration: 1400,
        delay: index * 130 + 200,
        useNativeDriver: false,
      }),
    ]).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const barWidth = barAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });

  return (
    <Animated.View
      style={[
        styles.cardWrapper,
        {
          transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
          opacity: opacityAnim,
        },
      ]}
    >
      <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut}>
        <View style={[styles.card, { borderColor: course.color + "33" }]}>
          {/* Left accent stripe */}
          <View style={[styles.accentStripe, { backgroundColor: course.color }]} />

          <View style={styles.cardContent}>
            {/* Top row */}
            <View style={styles.cardTop}>
              <View style={styles.cardInfo}>
                <Text style={[styles.tag, { color: course.color }]}>{course.tag}</Text>
                <Text style={styles.cardTitle}>{course.title}</Text>
                <Text style={styles.cardSubtitle}>{course.subtitle}</Text>
              </View>
              <ProgressRing progress={course.progress} color={course.color} size={64} />
            </View>

            {/* Progress bar */}
            <View style={styles.barRow}>
              <View style={styles.barTrack}>
                <Animated.View
                  style={[
                    styles.barFill,
                    {
                      width: barWidth,
                      backgroundColor: course.color,
                      shadowColor: course.color,
                    },
                  ]}
                />
              </View>
              <Text style={styles.lessonCount}>
                {course.completed}/{course.lessons}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}

export default function Dashboard() {
  const headerAnim = useRef(new Animated.Value(0)).current;
  const totalProgress = Math.round(
    COURSES.reduce((a, c) => a + c.progress, 0) / COURSES.length
  );
  const totalCompleted = COURSES.reduce((a, c) => a + c.completed, 0);

  const [fontsLoaded] = useFonts({
    Syne_700Bold,
    Syne_800ExtraBold,
    SpaceMono_400Regular,
    SpaceMono_700Bold,
  });

  useEffect(() => {
    Animated.timing(headerAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  if (!fontsLoaded) return null;

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#0c0c0c" />
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Animated.View
          style={[
            styles.header,
            {
              opacity: headerAnim,
              transform: [
                {
                  translateY: headerAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-20, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.eyebrow}>◈ LEARNING DASHBOARD</Text>
              <Text style={styles.heading}>Your{"\n"}Progress</Text>
            </View>

            {/* Avg stat card */}
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{totalProgress}%</Text>
              <Text style={styles.statLabel}>AVG DONE</Text>
            </View>
          </View>

          {/* Gradient divider (simulated) */}
          <View style={styles.divider} />
        </Animated.View>

        {/* Section label */}
        <Text style={styles.sectionLabel}>ACTIVE COURSES · {COURSES.length}</Text>

        {/* Cards */}
        {COURSES.map((course, i) => (
          <CourseCard key={course.id} course={course} index={i} />
        ))}

        {/* Footer */}
        <Text style={styles.footer}>
          {totalCompleted} LESSONS COMPLETE · KEEP GOING
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#0c0c0c",
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 48,
  },

  // Header
  header: {
    marginBottom: 32,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  eyebrow: {
    fontFamily: "SpaceMono_700Bold",
    fontSize: 10,
    color: "#444",
    letterSpacing: 2,
    marginBottom: 8,
  },
  heading: {
    fontFamily: "Syne_800ExtraBold",
    fontSize: 40,
    color: "#f5f5f5",
    letterSpacing: -1.5,
    lineHeight: 44,
  },
  statCard: {
    backgroundColor: "#141414",
    borderWidth: 1,
    borderColor: "#252525",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: "flex-end",
  },
  statNumber: {
    fontFamily: "Syne_800ExtraBold",
    fontSize: 30,
    color: "#f5f5f5",
    letterSpacing: -1,
    lineHeight: 34,
  },
  statLabel: {
    fontFamily: "SpaceMono_400Regular",
    fontSize: 9,
    color: "#444",
    letterSpacing: 1,
    marginTop: 2,
  },
  divider: {
    marginTop: 28,
    height: 1,
    backgroundColor: "#FF6B35",
    opacity: 0.4,
    borderRadius: 1,
  },

  // Section label
  sectionLabel: {
    fontFamily: "SpaceMono_700Bold",
    fontSize: 10,
    color: "#3a3a3a",
    letterSpacing: 2,
    marginBottom: 16,
  },

  // Card
  cardWrapper: {
    marginBottom: 14,
  },
  card: {
    backgroundColor: "#141414",
    borderWidth: 1,
    borderRadius: 16,
    flexDirection: "row",
    overflow: "hidden",
  },
  accentStripe: {
    width: 4,
    opacity: 0.7,
  },
  cardContent: {
    flex: 1,
    padding: 20,
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  cardInfo: {
    flex: 1,
    marginRight: 16,
  },
  tag: {
    fontFamily: "SpaceMono_700Bold",
    fontSize: 9,
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  cardTitle: {
    fontFamily: "Syne_700Bold",
    fontSize: 17,
    color: "#f0f0f0",
    letterSpacing: -0.4,
    lineHeight: 22,
    marginBottom: 4,
  },
  cardSubtitle: {
    fontFamily: "SpaceMono_400Regular",
    fontSize: 11,
    color: "#555",
    lineHeight: 17,
  },

  // Ring
  ringLabel: {
    fontFamily: "SpaceMono_700Bold",
    fontSize: 11,
  },

  // Bar
  barRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  barTrack: {
    flex: 1,
    height: 4,
    backgroundColor: "#252525",
    borderRadius: 99,
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    borderRadius: 99,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 4,
  },
  lessonCount: {
    fontFamily: "SpaceMono_400Regular",
    fontSize: 11,
    color: "#555",
    minWidth: 36,
    textAlign: "right",
  },

  // Footer
  footer: {
    marginTop: 36,
    textAlign: "center",
    fontFamily: "SpaceMono_400Regular",
    fontSize: 10,
    color: "#2e2e2e",
    letterSpacing: 1.5,
  },
});