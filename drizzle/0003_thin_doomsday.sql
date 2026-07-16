CREATE TABLE "problem_progress" (
	"user_id" uuid NOT NULL,
	"problem_id" uuid NOT NULL,
	"best_status" varchar(40) DEFAULT 'attempted' NOT NULL,
	"attempt_count" integer DEFAULT 1 NOT NULL,
	"solved_at" timestamp with time zone,
	"last_attempt_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "problem_progress" ADD CONSTRAINT "problem_progress_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "problem_progress" ADD CONSTRAINT "problem_progress_problem_id_problems_id_fk" FOREIGN KEY ("problem_id") REFERENCES "public"."problems"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "problem_progress_user_problem_unique" ON "problem_progress" USING btree ("user_id","problem_id");--> statement-breakpoint
CREATE INDEX "problem_progress_user_id_idx" ON "problem_progress" USING btree ("user_id");--> statement-breakpoint
INSERT INTO "problem_progress" ("user_id", "problem_id", "best_status", "attempt_count", "solved_at", "last_attempt_at")
SELECT
	"user_id",
	"problem_id",
	CASE WHEN bool_or("status" = 'accepted') THEN 'accepted' ELSE 'attempted' END,
	count(*)::integer,
	min("created_at") FILTER (WHERE "status" = 'accepted'),
	max("created_at")
FROM "submissions"
WHERE "user_id" IS NOT NULL
GROUP BY "user_id", "problem_id";
