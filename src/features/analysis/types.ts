export type AnalysisFinding = {
  kind: "strength" | "warning" | "info";
  title: string;
  detail: string;
};

export type AstAnalysis = {
  valid: boolean;
  error: string | null;
  timeComplexity: string;
  spaceComplexity: string;
  confidence: "low" | "medium" | "high";
  patterns: string[];
  metrics: {
    loops: number;
    maxLoopDepth: number;
    branches: number;
    functions: number;
    recursiveCalls: number;
  };
  findings: AnalysisFinding[];
};

export type CodeBertaAnalysis = {
  status: "available" | "not_configured" | "unavailable";
  model: string | null;
  label: string | null;
  confidence: number | null;
  probabilities: Array<{ label: string; probability: number }>;
  explanation: string;
};

export type CodeIntelligenceAnalysis = AstAnalysis & {
  codeBerta: CodeBertaAnalysis;
};
