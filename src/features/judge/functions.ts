import { and, asc, eq, sql } from "drizzle-orm";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { db } from "../../db";
import { problemProgress, problems, submissions, testCases } from "../../db/schema";
import { judgePython } from "./server";
import { ensureSession } from "../../lib/auth-functions";

const requestSchema = z.object({
  problemSlug: z.string().min(1).max(160),
  sourceCode: z.string().min(1).max(20_000),
});

async function execute(data: z.infer<typeof requestSchema>, includeHidden: boolean) {
  const problemRows = await db
    .select()
    .from(problems)
    .where(eq(problems.slug, data.problemSlug))
    .limit(1);

  if (problemRows.length === 0) throw new Error("Problem not found.");
  const problem = problemRows[0];

  const tests = await db
    .select()
    .from(testCases)
    .where(
      includeHidden
        ? eq(testCases.problemId, problem.id)
        : and(eq(testCases.problemId, problem.id), eq(testCases.isHidden, false)),
    )
    .orderBy(asc(testCases.position));

  if (tests.length === 0) throw new Error("No test cases are configured for this problem.");

  const result = await judgePython({
    sourceCode: data.sourceCode,
    functionName: problem.functionName,
    tests,
  });

  return { problem, result };
}

export const runCode = createServerFn({ method: "POST" })
  .validator(requestSchema)
  .handler(async ({ data }) => {
    const { result } = await execute(data, false);
    return result;
  });

export const submitCode = createServerFn({ method: "POST" })
  .validator(requestSchema)
  .handler(async ({ data }) => {
    const session = await ensureSession();
    const { problem, result } = await execute(data, true);

    await db.transaction(async (transaction) => {
      await transaction.insert(submissions).values({
        userId: session.user.id,
        problemId: problem.id,
        sourceCode: data.sourceCode,
        status: result.status,
        runtimeMs: result.runtimeMs,
        memoryKb: result.memoryKb,
        output: result.output,
      });

      await transaction
        .insert(problemProgress)
        .values({
          userId: session.user.id,
          problemId: problem.id,
          bestStatus: result.passed ? "accepted" : "attempted",
          solvedAt: result.passed ? new Date() : null,
        })
        .onConflictDoUpdate({
          target: [problemProgress.userId, problemProgress.problemId],
          set: {
            attemptCount: sql`${problemProgress.attemptCount} + 1`,
            lastAttemptAt: new Date(),
            ...(result.passed
              ? { bestStatus: "accepted", solvedAt: sql`coalesce(${problemProgress.solvedAt}, now())` }
              : {}),
          },
        });
    });

    return result;
  });
