import type { JsonValue } from "../judge/types";

export type TraceFrame = {
  step: number;
  line: number;
  event: "call" | "line" | "return" | "exception";
  callDepth: number;
  functionName: string;
  locals: Record<string, JsonValue>;
};

export type ExecutionTrace = {
  frames: TraceFrame[];
  truncated: boolean;
  input: JsonValue;
  output: JsonValue | null;
  error: string | null;
};
