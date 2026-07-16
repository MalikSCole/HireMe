import { describe, expect, it } from "vitest";

import { calculateAchievements } from "./achievements";

describe("calculateAchievements", () => {
  it("unlocks achievements when their target is reached", () => {
    const achievements = calculateAchievements({ solvedProblems: 5, completedLessons: 1, correctQuizAnswers: 0, completedReactChallenges: 0, longestStreak: 3, activeDayCount: 3 });

    expect(achievements.find((item) => item.id === "problem-solver")?.unlocked).toBe(true);
    expect(achievements.find((item) => item.id === "on-fire")?.unlocked).toBe(true);
    expect(achievements.find((item) => item.id === "knowledge-keeper")?.unlocked).toBe(false);
  });

  it("caps progress at one hundred percent", () => {
    const achievements = calculateAchievements({ solvedProblems: 10, completedLessons: 10, correctQuizAnswers: 10, completedReactChallenges: 3, longestStreak: 10, activeDayCount: 10 });

    expect(achievements.every((item) => item.percentage === 100)).toBe(true);
  });
});
