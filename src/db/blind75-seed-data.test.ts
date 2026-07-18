import { describe, expect, it } from 'vitest'

import {
  blind75LessonCatalog,
  blind75ProblemCatalog,
  blind75QuestionCatalog,
} from './blind75-seed-data'

describe('Blind 75 seed expansion', () => {
  it('adds one lesson and knowledge check for every new problem', () => {
    expect(blind75ProblemCatalog).toHaveLength(75)
    expect(blind75LessonCatalog).toHaveLength(75)
    expect(blind75QuestionCatalog).toHaveLength(75)

    const problemSlugs = new Set(
      blind75ProblemCatalog.map((problem) => problem.slug),
    )
    expect(problemSlugs.size).toBe(75)
    expect(
      new Set(blind75LessonCatalog.map((lesson) => lesson.slug)).size,
    ).toBe(75)
    expect(
      new Set(blind75QuestionCatalog.map((question) => question.lessonSlug))
        .size,
    ).toBe(75)

    for (const lesson of blind75LessonCatalog) {
      expect(problemSlugs.has(lesson.practiceProblemSlug)).toBe(true)
      const content = JSON.parse(lesson.content)
      expect(content.format).toBe('curriculum-v1')
      expect(content.learningObjectives.length).toBeGreaterThanOrEqual(4)
      expect(content.sections.length).toBeGreaterThanOrEqual(3)
      expect(content.workedExample.body).toBeTruthy()
      expect(content.practice.problemSlug).toBe(lesson.practiceProblemSlug)
      expect(content.quiz.prompt).toBeTruthy()
      expect(content.aiFeedback.prompt).toBeTruthy()
    }
  })

  it('provides progressive hints and both visible and hidden valid JSON tests', () => {
    for (const problem of blind75ProblemCatalog) {
      expect(JSON.parse(problem.hints)).toHaveLength(3)
      expect(problem.tests.filter((test) => !test.isHidden)).toHaveLength(2)
      expect(problem.tests.filter((test) => test.isHidden)).toHaveLength(2)

      for (const test of problem.tests) {
        expect(() => JSON.parse(test.input)).not.toThrow()
        expect(() => JSON.parse(test.expectedOutput)).not.toThrow()
      }
    }
  })
})
