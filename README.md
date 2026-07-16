# Code Learning Platform

A full-stack programming education platform for learning data structures, algorithms, and React through lessons, visual explanations, quizzes, coding challenges, and sandboxed code execution.

The project is built with TanStack Start, React, TypeScript, PostgreSQL, and Drizzle ORM. Python submissions are evaluated by a separate Piston service so learner code is never executed inside the web application process.

## Highlights

- 19 Python DSA problems across arrays, hashing, two pointers, sliding windows, stacks, binary search, heaps, graphs, and dynamic programming
- 24 structured DSA and React lessons with diagrams, worked examples, complexity analysis, common pitfalls, and knowledge checks
- Monaco-based Python problem workspace with starter code and saved drafts
- Visible test runs and authenticated submissions against hidden test cases
- Sandboxed Python execution through a separately hosted Piston service
- Submission history, problem progress, lesson completion, streaks, achievements, and personalized recommendations
- Interactive React lessons and Sandpack-based component challenges
- AST-based Python feedback for complexity signals and common implementation patterns
- Step-by-step execution replay with specialized algorithm visualizations
- Progressive, prewritten hints that do not expose hidden test data
- Optional CodeBERTa optimization classifier with automatic AST-only fallback
- Optional Groq-powered Socratic tutor for hints, edge cases, and code review

## Screens and workflows

The main user flow is:

```text
Choose a course
      ↓
Read a visual lesson
      ↓
Complete a knowledge check
      ↓
Open the linked practice problem
      ↓
Run visible tests → inspect execution → submit hidden tests
      ↓
Update progress, streaks, achievements, and recommendations
```

Important routes include:

| Route                        | Purpose                                              |
| ---------------------------- | ---------------------------------------------------- |
| `/learn`                     | Course catalog                                       |
| `/learn/courses/$courseSlug` | Course modules and lesson progress                   |
| `/learn/$lessonSlug`         | Lesson, diagram, quiz, and linked practice           |
| `/problems`                  | Filterable DSA problem catalog                       |
| `/problems/$problemSlug`     | Python editor, judge, hints, AI tutor, and replay    |
| `/learn/react/challenges`    | React challenge catalog                              |
| `/dashboard`                 | Progress, streaks, achievements, and recommendations |
| `/submissions`               | Authenticated submission history                     |

## Architecture

```text
Browser
  │
  ├── TanStack Router pages
  ├── Monaco Python editor
  └── Sandpack React preview
  │
TanStack Start server functions
  ├── Better Auth session checks
  ├── Zod request validation
  ├── Drizzle ORM ─────────────── PostgreSQL
  ├── Python judge ────────────── Piston
  ├── AST analysis and tracing ── Piston
  ├── Optional learned feedback ─ CodeBERTa service
  └── Optional AI tutor ───────── Groq Chat Completions API
```

The application sends source code and a generated test harness to Piston. Visible runs receive only public test cases. Authenticated submissions receive all tests on the server, but hidden inputs and expected outputs are removed from the response.

## Technology

| Area                  | Technology                            |
| --------------------- | ------------------------------------- |
| Full-stack framework  | TanStack Start                        |
| UI                    | React 19, TypeScript, Tailwind CSS    |
| Routing               | TanStack Router                       |
| Python editor         | Monaco Editor                         |
| React playground      | CodeSandbox Sandpack                  |
| Database              | PostgreSQL 17                         |
| ORM and migrations    | Drizzle ORM and Drizzle Kit           |
| Authentication        | Better Auth                           |
| Validation            | Zod                                   |
| Code execution        | Piston                                |
| Learned code analysis | Optional fine-tuned CodeBERTa service |
| AI tutor              | Optional Groq Chat Completions API    |
| Testing               | Vitest                                |

## Prerequisites

- Node.js 22 or newer
- npm
- Docker and Docker Compose for the local PostgreSQL container
- A separately running Piston instance with Python 3.10 available

CodeBERTa is optional. The deterministic AST analysis works without it.
The Groq tutor is also optional; the rest of the problem workspace remains available when it is not configured.

## Local setup

1. Install dependencies.

   ```bash
   npm install
   ```

2. Copy the environment template.

   ```bash
   cp .env.example .env
   ```

3. Generate a secure authentication secret and replace the example value in `.env`.

   ```bash
   openssl rand -base64 32
   ```

4. Start PostgreSQL.

   ```bash
   docker compose up -d postgres
   ```

5. Start or connect a Piston service on port `2000`, then confirm that `PISTON_URL` and `PISTON_PYTHON_VERSION` match that instance.

6. Apply migrations and seed the curriculum.

   ```bash
   npm run db:migrate
   npm run db:seed
   ```

7. Start the application.

   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable                | Required             | Description                                                  |
| ----------------------- | -------------------- | ------------------------------------------------------------ |
| `DATABASE_URL`          | Yes                  | PostgreSQL connection string used by the app and Drizzle     |
| `BETTER_AUTH_SECRET`    | Yes                  | High-entropy authentication secret of at least 32 characters |
| `BETTER_AUTH_URL`       | Yes                  | Public origin of the web application                         |
| `PISTON_URL`            | Yes for Python tools | Private URL of the Piston execution service                  |
| `PISTON_PYTHON_VERSION` | Yes for Python tools | Python runtime version installed in Piston                   |
| `CODEBERTA_URL`         | No                   | URL of the optional learned-analysis service                 |
| `CODEBERTA_API_KEY`     | No                   | Shared bearer token for the CodeBERTa service                |
| `GROQ_API_KEY`          | No                   | Server-only API key for the optional AI tutor                |
| `GROQ_MODEL`            | No                   | Groq chat model; defaults to `llama-3.3-70b-versatile`       |

Never commit `.env` or production secrets.

## Piston execution service

Piston must run separately from the application. The web process calls:

```text
POST {PISTON_URL}/api/v2/execute
```

The judge currently supports Python only and enforces:

- A 20 KB source-code limit
- A three-second execution timeout sent to Piston
- A five-second application-side request timeout
- A 128 MB memory limit for judged submissions
- Truncated error and console output
- Hidden-test redaction

For a public deployment, keep Piston on a private network and configure its own authentication, network isolation, concurrency controls, quotas, and request rate limiting. Do not expose an unrestricted Piston instance directly to the internet.

## Optional CodeBERTa service

The included service expects a fine-tuned sequence-classification checkpoint. The base `microsoft/codebert-base` checkpoint does not contain a trained optimization classifier.

```bash
docker build -t code-learning-codeberta services/codeberta

docker run --rm -p 8001:8001 \
  -e CODEBERTA_MODEL_ID=your-org/your-fine-tuned-codeberta \
  -e CODEBERTA_API_KEY=replace-me \
  code-learning-codeberta
```

Set matching `CODEBERTA_URL` and `CODEBERTA_API_KEY` values in `.env`. If the service is missing or unavailable, the user still receives deterministic AST feedback.

See [`services/codeberta/README.md`](services/codeberta/README.md) for additional details.

## Optional Groq AI tutor

Create a key from the [Groq API Keys console](https://console.groq.com/keys) and add it only to the server's `.env` file:

```env
GROQ_API_KEY=your-private-key
GROQ_MODEL=llama-3.3-70b-versatile
```

Restart the application after changing `.env`, sign in, and open any DSA problem. The **Optional Groq tutor** panel appears below the code editor with quick actions for a hint, approach review, or edge-case guidance.

The tutor is available inside each problem workspace to authenticated users. Requests include the public problem statement, the learner's current code, and up to eight recent chat messages. Hidden tests, hidden expected outputs, and submission records are never sent to Groq.

The integration calls Groq's OpenAI-compatible Chat Completions endpoint directly from a TanStack server function. Responses are capped, requests time out after 20 seconds, and each user is limited to 12 requests per hour per running application instance. For multi-instance production deployments, replace the in-memory limiter with Redis or another shared store.

## Database workflow

The schema is defined in `src/db/schema.ts`, generated migrations live in `drizzle/`, and repeatable curriculum data lives in `src/db/seed.ts`.

```bash
# Generate a migration after changing the schema
npm run db:generate

# Apply pending migrations
npm run db:migrate

# Insert or update curriculum data
npm run db:seed

# Inspect the database locally
npm run db:studio
```

The seed script is designed to be repeatable: problems, lessons, quizzes, tests, and React challenges are updated through stable slugs or unique positions.

## Available scripts

| Command                   | Description                                    |
| ------------------------- | ---------------------------------------------- |
| `npm run dev`             | Start the development server on port 3000      |
| `npm run build`           | Build the client and server production bundles |
| `npm start`               | Run the generated Nitro server                 |
| `npm run test`            | Run the Vitest suite                           |
| `npm run lint`            | Run ESLint                                     |
| `npm run check`           | Check formatting with Prettier                 |
| `npm run format`          | Format files and apply ESLint fixes            |
| `npm run generate-routes` | Regenerate the TanStack route tree             |
| `npm run db:generate`     | Generate a Drizzle migration                   |
| `npm run db:migrate`      | Apply database migrations                      |
| `npm run db:seed`         | Seed or update learning content                |
| `npm run db:studio`       | Open Drizzle Studio                            |

## Security model

- User code runs in Piston rather than the TanStack application process.
- Server functions validate identifiers and source-code lengths with Zod.
- Database operations use Drizzle query builders and parameterized expressions.
- Hidden test inputs and expected values are never returned to the browser.
- Submitting solutions, saving user progress, and viewing submission history require a verified server session.
- The judge applies execution, memory, request, source, and output limits.
- The CodeBERTa service supports a shared bearer token and should remain private.
- The Groq key remains server-side, tutor access requires authentication, and request context excludes hidden tests.
- Secrets are loaded from environment variables and excluded from version control.

Application-level distributed rate limiting and production Piston hardening remain deployment responsibilities and should be completed before opening the service to untrusted public traffic.

## Testing and quality checks

Run the local verification suite with:

```bash
npx tsc --noEmit
npm run lint
npm run test
npm run build
git diff --check
```

Current automated coverage includes unit tests for achievement calculation. Expanding coverage for server functions, judge response normalization, authentication boundaries, and browser workflows is a planned production-hardening step.

## Project structure

```text
src/
├── components/          # Editors, diagrams, replays, roadmaps, and challenge UI
├── db/                  # Drizzle client, schema, and curriculum seed data
├── features/
│   ├── analysis/        # AST and optional CodeBERTa feedback
│   ├── drafts/          # Saved problem code
│   ├── judge/           # Piston execution and test evaluation
│   ├── lessons/         # Completion and quiz actions
│   ├── progress/        # Achievement rules
│   ├── react-challenges/# Challenge completion
│   └── trace/           # Instrumented execution replay
├── lib/                 # Authentication helpers and shared utilities
└── routes/              # TanStack file-based routes

drizzle/                 # Generated PostgreSQL migrations
services/codeberta/      # Optional Python inference service
docker-compose.yml       # Local PostgreSQL
```

## Current scope and roadmap

Implemented:

- Authentication and persisted learning progress
- DSA and React curricula
- Python run and submit workflow
- Hidden tests and submission history
- React coding challenges
- AST feedback and execution visualization
- Streaks, achievements, and recommendations

Planned improvements:

- Integration and Playwright end-to-end coverage
- Distributed production rate limiting and submission quotas
- Persistent discussion threads and user profiles
- Administrative curriculum editor
- Topic-mastery scoring and deeper personalized recommendations
- Production deployment and observability
- Fine-tuned CodeBERTa checkpoint evaluation

## Resume summary

> Built a full-stack programming education platform using TanStack Start, React, TypeScript, PostgreSQL, and Drizzle, featuring sandboxed Python execution, hidden test evaluation, interactive React challenges, AST-based code feedback, execution visualizations, and personalized progress tracking.

## License

No license has been selected yet. Add a license before accepting external contributions or redistributing the project.
