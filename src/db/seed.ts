import "dotenv/config";
import { db } from "./index";
import { problems } from "./schema";

async function seed() {
  await db
    .insert(problems)
    .values({
      title: "Two Sum",
      slug: "two-sum",
      description: `
Given an array of integers nums and an integer target,
return the indices of the two numbers that add up to target.
      `.trim(),
      difficulty: "easy",
      starterCode: `def two_sum(nums, target):
    # Write your solution here
    pass
`,
      functionName: "two_sum",
    })
    .onConflictDoNothing();

  console.log("Database seeded successfully.");
}

seed()
  .catch((error) => {
    console.error("Failed to seed database:", error);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });