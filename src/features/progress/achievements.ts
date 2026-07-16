export type AchievementProgress = {
  solvedProblems: number;
  completedLessons: number;
  correctQuizAnswers: number;
  completedReactChallenges: number;
  longestStreak: number;
  activeDayCount: number;
};

const definitions = [
  { id: "first-solve", title: "First Solve", description: "Solve your first DSA problem.", icon: "✓", field: "solvedProblems", target: 1 },
  { id: "problem-solver", title: "Problem Solver", description: "Solve five DSA problems.", icon: "⌨", field: "solvedProblems", target: 5 },
  { id: "course-starter", title: "Course Starter", description: "Complete your first lesson.", icon: "📖", field: "completedLessons", target: 1 },
  { id: "knowledge-keeper", title: "Knowledge Keeper", description: "Answer five knowledge checks correctly.", icon: "🧠", field: "correctQuizAnswers", target: 5 },
  { id: "react-builder", title: "React Builder", description: "Complete a React coding challenge.", icon: "⚛", field: "completedReactChallenges", target: 1 },
  { id: "on-fire", title: "On Fire", description: "Build a three-day learning streak.", icon: "🔥", field: "longestStreak", target: 3 },
  { id: "dedicated-learner", title: "Dedicated Learner", description: "Learn on seven different days.", icon: "🏆", field: "activeDayCount", target: 7 },
] as const;

export function calculateAchievements(progress: AchievementProgress) {
  return definitions.map((achievement) => {
    const current = progress[achievement.field];
    return {
      ...achievement,
      current,
      unlocked: current >= achievement.target,
      percentage: Math.min(100, Math.round((current / achievement.target) * 100)),
    };
  });
}
