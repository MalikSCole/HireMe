import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { and, eq } from 'drizzle-orm'
import { z } from 'zod'
import { db } from '../../db'
import { problemProgress, problems } from '../../db/schema'
import { getSession } from '../../lib/auth-functions'

const filterSchema = z.object({
  difficulty: z.enum(['easy', 'medium', 'hard']).optional(),
  topic: z
    .enum([
      'arrays',
      'hash-maps',
      'strings',
      'two-pointers',
      'sliding-window',
      'stacks',
      'binary-search',
      'linked-lists',
      'heaps',
      'trees',
      'graphs',
      'dynamic-programming',
    ])
    .optional(),
  status: z.enum(['unsolved', 'attempted', 'solved']).optional(),
})

const getProblems = createServerFn({ method: 'GET' })
  .validator(filterSchema)
  .handler(async ({ data }) => {
    const session = await getSession()
    let rows
    if (!session) {
      const publicRows = await db.select().from(problems)
      rows = publicRows.map((problem) => ({
        ...problem,
        progressStatus: null,
        attemptCount: 0,
      }))
    } else {
      rows = await db
        .select({
          id: problems.id,
          title: problems.title,
          slug: problems.slug,
          description: problems.description,
          difficulty: problems.difficulty,
          topic: problems.topic,
          starterCode: problems.starterCode,
          functionName: problems.functionName,
          progressStatus: problemProgress.bestStatus,
          attemptCount: problemProgress.attemptCount,
        })
        .from(problems)
        .leftJoin(
          problemProgress,
          and(
            eq(problemProgress.problemId, problems.id),
            eq(problemProgress.userId, session.user.id),
          ),
        )
    }

    return rows.filter((problem) => {
      if (data.difficulty && problem.difficulty !== data.difficulty)
        return false
      if (data.topic && problem.topic !== data.topic) return false
      if (data.status === 'solved' && problem.progressStatus !== 'accepted')
        return false
      if (data.status === 'attempted' && problem.progressStatus !== 'attempted')
        return false
      if (data.status === 'unsolved' && problem.progressStatus) return false
      return true
    })
  })

export const Route = createFileRoute('/problems/')({
  validateSearch: filterSchema,
  loaderDeps: ({ search }) => search,
  loader: ({ deps }) => getProblems({ data: deps }),
  component: ProblemsPage,
})

function ProblemsPage() {
  const problemList = Route.useLoaderData()
  const filters = Route.useSearch()
  const navigate = useNavigate({ from: Route.fullPath })

  function updateFilter(key: keyof typeof filters, value: string) {
    void navigate({
      search: (previous) => ({
        ...previous,
        [key]: value === 'all' ? undefined : value,
      }),
    })
  }

  return (
    <main className="mx-auto max-w-5xl p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">DSA Problems</h1>

        <p className="mt-2 text-gray-600">
          Practice problems and track your progress.
        </p>
      </div>

      <section
        className="mb-6 grid gap-3 rounded-lg border bg-gray-50 p-4 sm:grid-cols-3"
        aria-label="Problem filters"
      >
        <Filter
          label="Difficulty"
          value={filters.difficulty ?? 'all'}
          onChange={(value) => updateFilter('difficulty', value)}
          options={['all', 'easy', 'medium', 'hard']}
        />
        <Filter
          label="Topic"
          value={filters.topic ?? 'all'}
          onChange={(value) => updateFilter('topic', value)}
          options={[
            'all',
            'arrays',
            'hash-maps',
            'strings',
            'two-pointers',
            'sliding-window',
            'stacks',
            'binary-search',
            'linked-lists',
            'heaps',
            'trees',
            'graphs',
            'dynamic-programming',
          ]}
        />
        <Filter
          label="Status"
          value={filters.status ?? 'all'}
          onChange={(value) => updateFilter('status', value)}
          options={['all', 'unsolved', 'attempted', 'solved']}
        />
      </section>

      {problemList.length === 0 ? (
        <p className="rounded-lg border p-6 text-gray-600">
          No problems match these filters.
        </p>
      ) : (
        <div className="space-y-4">
          {problemList.map((problem) => (
            <article
              key={problem.id}
              className="rounded-lg border p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">{problem.title}</h2>

                <div className="flex items-center gap-2">
                  {problem.progressStatus && (
                    <span
                      className={
                        problem.progressStatus === 'accepted'
                          ? 'rounded-full bg-green-100 px-3 py-1 text-sm text-green-800'
                          : 'rounded-full bg-amber-100 px-3 py-1 text-sm text-amber-800'
                      }
                    >
                      {problem.progressStatus === 'accepted'
                        ? 'Solved'
                        : 'Attempted'}
                    </span>
                  )}
                  <span className="rounded-full border px-3 py-1 text-sm capitalize">
                    {problem.difficulty}
                  </span>
                </div>
              </div>

              <p className="mt-3 text-gray-700">
                {problem.description.split('\n\n')[0]}
              </p>
              <p className="mt-3 text-sm font-medium capitalize text-blue-700">
                {problem.topic.replaceAll('-', ' ')}
              </p>

              <Link
                to="/problems/$problemSlug"
                params={{ problemSlug: problem.slug }}
                className="mt-4 inline-block font-medium underline"
              >
                {problem.progressStatus === 'accepted'
                  ? 'Solve again'
                  : problem.progressStatus
                    ? 'Continue problem'
                    : 'Solve problem'}
              </Link>
              {(problem.attemptCount ?? 0) > 0 && (
                <span className="ml-4 text-sm text-gray-500">
                  {problem.attemptCount}{' '}
                  {problem.attemptCount === 1 ? 'attempt' : 'attempts'}
                </span>
              )}
            </article>
          ))}
        </div>
      )}
    </main>
  )
}

function Filter({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: string[]
  onChange: (value: string) => void
}) {
  return (
    <label className="text-sm font-medium">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-1 block w-full rounded border bg-white px-3 py-2 capitalize"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option.replaceAll('-', ' ')}
          </option>
        ))}
      </select>
    </label>
  )
}
