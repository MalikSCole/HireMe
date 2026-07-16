import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-blue-700">Learn by building</p>
      <h1 className="mx-auto mt-4 max-w-3xl text-5xl font-bold tracking-tight">Master data structures and algorithms through deliberate practice.</h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">Write Python, run visible tests, submit against hidden cases, and track your progress from one focused workspace.</p>
      <div className="mt-8 flex justify-center gap-4">
        <Link to="/problems" className="rounded bg-blue-600 px-5 py-3 font-medium text-white">Browse problems</Link>
        <Link to="/dashboard" className="rounded border px-5 py-3 font-medium">View dashboard</Link>
      </div>
    </main>
  )
}
