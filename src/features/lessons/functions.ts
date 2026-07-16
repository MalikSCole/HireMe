import { eq } from "drizzle-orm";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { db } from "../../db";
import { lessonProgress, lessonQuestions, lessons, quizAttempts } from "../../db/schema";
import { ensureSession, getSession } from "../../lib/auth-functions";

export const completeLesson = createServerFn({ method: "POST" })
  .validator(z.object({ lessonSlug: z.string().min(1).max(160) }))
  .handler(async ({ data }) => {
    const session = await ensureSession();
    const lessonRows = await db.select({ id: lessons.id }).from(lessons).where(eq(lessons.slug, data.lessonSlug)).limit(1);
    if (lessonRows.length === 0) throw new Error("Lesson not found.");

    await db
      .insert(lessonProgress)
      .values({ userId: session.user.id, lessonId: lessonRows[0].id })
      .onConflictDoNothing();

    return { completed: true };
  });

export const submitKnowledgeCheck = createServerFn({ method: "POST" })
  .validator(z.object({ questionId: z.string().uuid(), selectedIndex: z.number().int().min(0).max(10) }))
  .handler(async ({ data }) => {
    const rows = await db.select().from(lessonQuestions).where(eq(lessonQuestions.id, data.questionId)).limit(1);
    if (rows.length === 0) throw new Error("Knowledge check not found.");
    const question = rows[0];
    const passed = data.selectedIndex === question.correctIndex;
    const session = await getSession();

    if (session) {
      await db
        .insert(quizAttempts)
        .values({ userId: session.user.id, questionId: question.id, selectedIndex: data.selectedIndex, passed })
        .onConflictDoUpdate({
          target: [quizAttempts.userId, quizAttempts.questionId],
          set: { selectedIndex: data.selectedIndex, passed, attemptedAt: new Date() },
        });
    }

    return { passed, correctIndex: question.correctIndex, explanation: question.explanation };
  });
