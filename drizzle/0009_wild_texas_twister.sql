ALTER TABLE "react_challenges" ADD COLUMN "test_code" text DEFAULT '' NOT NULL;
ALTER TABLE "react_challenges" ALTER COLUMN "test_code" DROP DEFAULT;
