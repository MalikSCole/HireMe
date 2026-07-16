CREATE TABLE "lesson_questions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"lesson_id" uuid NOT NULL,
	"prompt" text NOT NULL,
	"options" text NOT NULL,
	"correct_index" integer NOT NULL,
	"explanation" text NOT NULL,
	CONSTRAINT "lesson_questions_lesson_id_unique" UNIQUE("lesson_id")
);
--> statement-breakpoint
CREATE TABLE "quiz_attempts" (
	"user_id" uuid NOT NULL,
	"question_id" uuid NOT NULL,
	"selected_index" integer NOT NULL,
	"passed" boolean NOT NULL,
	"attempted_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "lesson_questions" ADD CONSTRAINT "lesson_questions_lesson_id_lessons_id_fk" FOREIGN KEY ("lesson_id") REFERENCES "public"."lessons"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quiz_attempts" ADD CONSTRAINT "quiz_attempts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quiz_attempts" ADD CONSTRAINT "quiz_attempts_question_id_lesson_questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."lesson_questions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "quiz_attempts_user_question_unique" ON "quiz_attempts" USING btree ("user_id","question_id");