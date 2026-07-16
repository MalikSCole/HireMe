import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "../../db";
import { problems } from "../../db/schema";
import { analyzeWithCodeBerta } from "./codeberta-server";
import { analyzePythonAst } from "./server";

export const analyzeCode = createServerFn({ method: "POST" })
  .validator(z.object({ problemSlug: z.string().min(1).max(160), sourceCode: z.string().min(1).max(20_000) }))
  .handler(async ({ data }) => {
    const problemRows = await db.select({ title: problems.title, description: problems.description }).from(problems).where(eq(problems.slug, data.problemSlug)).limit(1);
    if (problemRows.length === 0) throw new Error("Problem not found.");
    const ast = await analyzePythonAst(data.sourceCode);
    const codeBerta = ast.valid
      ? await analyzeWithCodeBerta({ sourceCode: data.sourceCode, problemTitle: problemRows[0].title, problemDescription: problemRows[0].description, ast })
      : { status: "not_configured" as const, model: null, label: null, confidence: null, probabilities: [], explanation: "Fix the syntax error before requesting model feedback." };
    return { ...ast, codeBerta };
  });
