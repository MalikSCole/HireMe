import type { AstAnalysis, CodeBertaAnalysis } from "./types";

type ClassifierResponse = {
  model: string;
  label: string;
  confidence: number;
  probabilities: Array<{ label: string; probability: number }>;
};

function explain(label: string, ast: AstAnalysis) {
  const normalized = label.toLowerCase().replaceAll(/[_-]/g, " ");
  if (normalized.includes("optimal")) return `The classifier recognizes an optimization-oriented structure. The AST estimate is ${ast.timeComplexity} time and ${ast.spaceComplexity} space.`;
  if (normalized.includes("needs") || normalized.includes("inefficient")) return `The classifier sees likely optimization opportunities. Review repeated traversal, data-structure choice, and the AST findings below.`;
  return `The classifier considers this solution broadly acceptable, while the AST analyzer estimates ${ast.timeComplexity} time and ${ast.spaceComplexity} space.`;
}

export async function analyzeWithCodeBerta(args: {
  sourceCode: string;
  problemTitle: string;
  problemDescription: string;
  ast: AstAnalysis;
}): Promise<CodeBertaAnalysis> {
  const serviceUrl = process.env.CODEBERTA_URL;
  if (!serviceUrl) return { status: "not_configured", model: null, label: null, confidence: null, probabilities: [], explanation: "Configure CODEBERTA_URL to enable learned optimization feedback." };

  try {
    const response = await fetch(`${serviceUrl.replace(/\/$/, "")}/analyze`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(process.env.CODEBERTA_API_KEY ? { authorization: `Bearer ${process.env.CODEBERTA_API_KEY}` } : {}),
      },
      body: JSON.stringify({
        source_code: args.sourceCode,
        problem_title: args.problemTitle,
        problem_description: args.problemDescription,
        ast_features: {
          time_complexity: args.ast.timeComplexity,
          space_complexity: args.ast.spaceComplexity,
          patterns: args.ast.patterns,
          metrics: args.ast.metrics,
        },
      }),
      signal: AbortSignal.timeout(8_000),
    });
    if (!response.ok) throw new Error(`Classifier returned HTTP ${response.status}.`);
    const result = (await response.json()) as ClassifierResponse;
    return {
      status: "available",
      model: result.model,
      label: result.label,
      confidence: result.confidence,
      probabilities: result.probabilities,
      explanation: explain(result.label, args.ast),
    };
  } catch (error) {
    return { status: "unavailable", model: null, label: null, confidence: null, probabilities: [], explanation: error instanceof Error ? `CodeBERTa is temporarily unavailable: ${error.message}` : "CodeBERTa is temporarily unavailable." };
  }
}
