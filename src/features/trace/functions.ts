import { createServerFn } from "@tanstack/react-start";
import { and, asc, eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "../../db";
import { problems, testCases } from "../../db/schema";
import type { JsonValue } from "../judge/types";
import { tracePython } from "./server";

export const traceCode = createServerFn({ method: "POST" })
  .validator(z.object({ problemSlug: z.string().min(1).max(160), sourceCode: z.string().min(1).max(20_000) }))
  .handler(async ({ data }) => {
    const rows = await db
      .select({ functionName: problems.functionName, input: testCases.input })
      .from(problems)
      .innerJoin(testCases, eq(testCases.problemId, problems.id))
      .where(and(eq(problems.slug, data.problemSlug), eq(testCases.isHidden, false)))
      .orderBy(asc(testCases.position))
      .limit(1);
    if (rows.length === 0) throw new Error("No visible test is configured for this problem.");
    return tracePython({ sourceCode: data.sourceCode, functionName: rows[0].functionName, input: JSON.parse(rows[0].input) as JsonValue });
  });
