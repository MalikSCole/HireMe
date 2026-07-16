CREATE TABLE "react_challenges" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"lesson_id" uuid NOT NULL,
	"title" varchar(160) NOT NULL,
	"slug" varchar(160) NOT NULL,
	"description" text NOT NULL,
	"difficulty" "difficulty" NOT NULL,
	"starter_code" text NOT NULL,
	"requirements" text NOT NULL,
	"position" integer NOT NULL,
	CONSTRAINT "react_challenges_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "react_challenges" ADD CONSTRAINT "react_challenges_lesson_id_lessons_id_fk" FOREIGN KEY ("lesson_id") REFERENCES "public"."lessons"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "react_challenges_lesson_position_unique" ON "react_challenges" USING btree ("lesson_id","position");--> statement-breakpoint
CREATE INDEX "react_challenges_lesson_id_idx" ON "react_challenges" USING btree ("lesson_id");