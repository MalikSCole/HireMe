import {
  boolean,
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const difficultyEnum = pgEnum("difficulty", [
  "easy",
  "medium",
  "hard",
]);

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  username: varchar("username", { length: 50 }).notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const sessions = pgTable(
  "sessions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    token: text("token").notNull(),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("sessions_token_unique").on(table.token),
    index("sessions_user_id_idx").on(table.userId),
  ],
);

export const accounts = pgTable(
  "accounts",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at", { withTimezone: true }),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at", { withTimezone: true }),
    scope: text("scope"),
    idToken: text("id_token"),
    password: text("password"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("accounts_user_id_idx").on(table.userId),
    uniqueIndex("accounts_provider_account_unique").on(table.providerId, table.accountId),
  ],
);

export const verifications = pgTable(
  "verifications",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [index("verifications_identifier_idx").on(table.identifier)],
);

export const courses = pgTable("courses", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar("title", { length: 160 }).notNull(),
  slug: varchar("slug", { length: 160 }).notNull().unique(),
  category: varchar("category", { length: 80 }).notNull(),
  description: text("description").notNull(),
});

export const courseModules = pgTable(
  "course_modules",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    courseId: uuid("course_id")
      .notNull()
      .references(() => courses.id, { onDelete: "cascade" }),
    title: varchar("title", { length: 160 }).notNull(),
    position: integer("position").notNull(),
  },
  (table) => [uniqueIndex("course_modules_course_position_unique").on(table.courseId, table.position)],
);

export const lessons = pgTable(
  "lessons",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    moduleId: uuid("module_id")
      .notNull()
      .references(() => courseModules.id, { onDelete: "cascade" }),
    title: varchar("title", { length: 160 }).notNull(),
    slug: varchar("slug", { length: 160 }).notNull().unique(),
    summary: text("summary").notNull(),
    content: text("content").notNull(),
    position: integer("position").notNull(),
    practiceProblemSlug: varchar("practice_problem_slug", { length: 160 }),
  },
  (table) => [uniqueIndex("lessons_module_position_unique").on(table.moduleId, table.position)],
);

export const lessonProgress = pgTable(
  "lesson_progress",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    lessonId: uuid("lesson_id")
      .notNull()
      .references(() => lessons.id, { onDelete: "cascade" }),
    completedAt: timestamp("completed_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("lesson_progress_user_lesson_unique").on(table.userId, table.lessonId),
    index("lesson_progress_user_id_idx").on(table.userId),
  ],
);

export const lessonQuestions = pgTable("lesson_questions", {
  id: uuid("id").defaultRandom().primaryKey(),
  lessonId: uuid("lesson_id")
    .notNull()
    .references(() => lessons.id, { onDelete: "cascade" })
    .unique(),
  prompt: text("prompt").notNull(),
  options: text("options").notNull(),
  correctIndex: integer("correct_index").notNull(),
  explanation: text("explanation").notNull(),
});

export const quizAttempts = pgTable(
  "quiz_attempts",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    questionId: uuid("question_id")
      .notNull()
      .references(() => lessonQuestions.id, { onDelete: "cascade" }),
    selectedIndex: integer("selected_index").notNull(),
    passed: boolean("passed").notNull(),
    attemptedAt: timestamp("attempted_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [uniqueIndex("quiz_attempts_user_question_unique").on(table.userId, table.questionId)],
);

export const reactChallenges = pgTable("react_challenges", {
  id: uuid("id").defaultRandom().primaryKey(),
  lessonId: uuid("lesson_id")
    .notNull()
    .references(() => lessons.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 160 }).notNull(),
  slug: varchar("slug", { length: 160 }).notNull().unique(),
  description: text("description").notNull(),
  difficulty: difficultyEnum("difficulty").notNull(),
  starterCode: text("starter_code").notNull(),
  testCode: text("test_code").notNull(),
  requirements: text("requirements").notNull(),
  position: integer("position").notNull(),
}, (table) => [
  uniqueIndex("react_challenges_lesson_position_unique").on(table.lessonId, table.position),
  index("react_challenges_lesson_id_idx").on(table.lessonId),
]);

export const reactChallengeProgress = pgTable("react_challenge_progress", {
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  challengeId: uuid("challenge_id")
    .notNull()
    .references(() => reactChallenges.id, { onDelete: "cascade" }),
  sourceCode: text("source_code").notNull(),
  completedAt: timestamp("completed_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => [
  uniqueIndex("react_challenge_progress_user_challenge_unique").on(table.userId, table.challengeId),
  index("react_challenge_progress_user_id_idx").on(table.userId),
]);

export const problems = pgTable("problems", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar("title", { length: 160 }).notNull(),
  slug: varchar("slug", { length: 160 }).notNull().unique(),
  description: text("description").notNull(),
  difficulty: difficultyEnum("difficulty").notNull(),
  topic: varchar("topic", { length: 80 }).default("arrays").notNull(),
  starterCode: text("starter_code").notNull(),
  functionName: varchar("function_name", { length: 100 }).notNull(),
  hints: text("hints").default("[]").notNull(),
});

export const testCases = pgTable("test_cases", {
  id: uuid("id").defaultRandom().primaryKey(),
  problemId: uuid("problem_id")
    .notNull()
    .references(() => problems.id, { onDelete: "cascade" }),
  input: text("input").notNull(),
  expectedOutput: text("expected_output").notNull(),
  isHidden: boolean("is_hidden").default(false).notNull(),
  position: integer("position").default(0).notNull(),
});

export const submissions = pgTable("submissions", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id),
  problemId: uuid("problem_id")
    .notNull()
    .references(() => problems.id),
  language: varchar("language", { length: 30 }).default("python").notNull(),
  sourceCode: text("source_code").notNull(),
  status: varchar("status", { length: 40 }).default("pending").notNull(),
  runtimeMs: integer("runtime_ms"),
  memoryKb: integer("memory_kb"),
  output: text("output"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const problemProgress = pgTable(
  "problem_progress",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    problemId: uuid("problem_id")
      .notNull()
      .references(() => problems.id, { onDelete: "cascade" }),
    bestStatus: varchar("best_status", { length: 40 }).default("attempted").notNull(),
    attemptCount: integer("attempt_count").default(1).notNull(),
    solvedAt: timestamp("solved_at", { withTimezone: true }),
    lastAttemptAt: timestamp("last_attempt_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("problem_progress_user_problem_unique").on(table.userId, table.problemId),
    index("problem_progress_user_id_idx").on(table.userId),
  ],
);

export const codeDrafts = pgTable(
  "code_drafts",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    problemId: uuid("problem_id")
      .notNull()
      .references(() => problems.id, { onDelete: "cascade" }),
    sourceCode: text("source_code").notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("code_drafts_user_problem_unique").on(table.userId, table.problemId),
    index("code_drafts_user_id_idx").on(table.userId),
  ],
);
