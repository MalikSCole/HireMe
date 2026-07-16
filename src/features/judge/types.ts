export type JudgeStatus =
  | "accepted"
  | "wrong_answer"
  | "runtime_error"
  | "time_limit_exceeded"
  | "internal_error";

export type TestResult = {
  position: number;
  passed: boolean;
  hidden: boolean;
  input?: JsonValue;
  expected?: JsonValue;
  actual?: JsonValue;
  error?: string;
};

export type JudgeResult = {
  status: JudgeStatus;
  passed: boolean;
  passedCount: number;
  totalCount: number;
  runtimeMs: number;
  memoryKb: number | null;
  output: string;
  tests: TestResult[];
  trace?: JsonValue[];
};
export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };
