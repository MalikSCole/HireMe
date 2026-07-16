CREATE TABLE "react_challenge_progress" (
	"user_id" uuid NOT NULL,
	"challenge_id" uuid NOT NULL,
	"source_code" text NOT NULL,
	"completed_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "react_challenge_progress" ADD CONSTRAINT "react_challenge_progress_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "react_challenge_progress" ADD CONSTRAINT "react_challenge_progress_challenge_id_react_challenges_id_fk" FOREIGN KEY ("challenge_id") REFERENCES "public"."react_challenges"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "react_challenge_progress_user_challenge_unique" ON "react_challenge_progress" USING btree ("user_id","challenge_id");--> statement-breakpoint
CREATE INDEX "react_challenge_progress_user_id_idx" ON "react_challenge_progress" USING btree ("user_id");