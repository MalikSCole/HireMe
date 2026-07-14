import {
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
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
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const problems = pgTable("problems", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar("title", { length: 160 }).notNull(),
  slug: varchar("slug", { length: 160 }).notNull().unique(),
  description: text("description").notNull(),
  difficulty: difficultyEnum("difficulty").notNull(),
  starterCode: text("starter_code").notNull(),
  functionName: varchar("function_name", { length: 100 }).notNull(),
});

export const submissions = pgTable("submissions", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  problemId: uuid("problem_id")
    .notNull()
    .references(() => problems.id),
  language: varchar("language", { length: 30 }).default("python").notNull(),
  sourceCode: text("source_code").notNull(),
  status: varchar("status", { length: 40 }).default("pending").notNull(),
  runtimeMs: integer("runtime_ms"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});