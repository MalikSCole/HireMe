import { eq } from "drizzle-orm";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { db } from "../../db";
import { codeDrafts, problems } from "../../db/schema";
import { ensureSession } from "../../lib/auth-functions";

const draftSchema = z.object({
  problemSlug: z.string().min(1).max(160),
  sourceCode: z.string().max(20_000),
});

export const saveDraft = createServerFn({ method: "POST" })
  .validator(draftSchema)
  .handler(async ({ data }) => {
    const session = await ensureSession();
    const problemRows = await db
      .select({ id: problems.id })
      .from(problems)
      .where(eq(problems.slug, data.problemSlug))
      .limit(1);

    if (problemRows.length === 0) throw new Error("Problem not found.");

    await db
      .insert(codeDrafts)
      .values({
        userId: session.user.id,
        problemId: problemRows[0].id,
        sourceCode: data.sourceCode,
      })
      .onConflictDoUpdate({
        target: [codeDrafts.userId, codeDrafts.problemId],
        set: { sourceCode: data.sourceCode, updatedAt: new Date() },
      });

    return { savedAt: new Date() };
  });
