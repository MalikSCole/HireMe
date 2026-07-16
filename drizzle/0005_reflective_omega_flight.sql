CREATE TABLE "code_drafts" (
	"user_id" uuid NOT NULL,
	"problem_id" uuid NOT NULL,
	"source_code" text NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "code_drafts" ADD CONSTRAINT "code_drafts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "code_drafts" ADD CONSTRAINT "code_drafts_problem_id_problems_id_fk" FOREIGN KEY ("problem_id") REFERENCES "public"."problems"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "code_drafts_user_problem_unique" ON "code_drafts" USING btree ("user_id","problem_id");--> statement-breakpoint
CREATE INDEX "code_drafts_user_id_idx" ON "code_drafts" USING btree ("user_id");