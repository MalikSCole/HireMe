import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "../../db";
import { reactChallengeProgress, reactChallenges } from "../../db/schema";
import { ensureSession } from "../../lib/auth-functions";

export const completeReactChallenge = createServerFn({ method: "POST" })
  .validator(z.object({ challengeSlug: z.string().min(1).max(160), sourceCode: z.string().min(1).max(50_000) }))
  .handler(async ({ data }) => {
    const session = await ensureSession();
    const rows = await db.select({ id: reactChallenges.id }).from(reactChallenges).where(eq(reactChallenges.slug, data.challengeSlug)).limit(1);
    if (rows.length === 0) throw new Error("React challenge not found.");

    await db
      .insert(reactChallengeProgress)
      .values({ userId: session.user.id, challengeId: rows[0].id, sourceCode: data.sourceCode })
      .onConflictDoUpdate({
        target: [reactChallengeProgress.userId, reactChallengeProgress.challengeId],
        set: { sourceCode: data.sourceCode, completedAt: new Date() },
      });

    return { completed: true };
  });
