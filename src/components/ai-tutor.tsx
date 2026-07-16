import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from '@tanstack/react-router'

import { askTutor } from '../features/tutor/functions'
import type { TutorMessage } from '../features/tutor/types'

export function AiTutor({
  problemSlug,
  sourceCode,
  signedIn,
}: {
  problemSlug: string
  sourceCode: string
  signedIn: boolean
}) {
  const [messages, setMessages] = useState<TutorMessage[]>([])
  const [question, setQuestion] = useState('')
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [remaining, setRemaining] = useState<number | null>(null)

  async function send(content: string) {
    const trimmed = content.trim()
    if (!trimmed || pending) return
    const userMessage: TutorMessage = { role: 'user', content: trimmed }
    const history = [...messages, userMessage].slice(-8)
    setMessages(history)
    setQuestion('')
    setPending(true)
    setError(null)
    try {
      const response = await askTutor({
        data: { problemSlug, sourceCode, messages: history },
      })
      const assistantMessage: TutorMessage = {
        role: 'assistant',
        content: response.message,
      }
      setMessages((current) => [...current, assistantMessage].slice(-8))
      setRemaining(response.remainingRequests)
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : 'The AI tutor could not respond.',
      )
    } finally {
      setPending(false)
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    void send(question)
  }

  return (
    <section
      className="mt-6 rounded-xl border border-cyan-200 bg-cyan-50/40 p-5"
      aria-labelledby="ai-tutor-title"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-cyan-800">
            Optional Groq tutor
          </p>
          <h2 id="ai-tutor-title" className="mt-1 text-xl font-semibold">
            Ask about your approach
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            The tutor sees this problem and your current code, but never
            receives hidden tests.
          </p>
        </div>
        {remaining !== null && (
          <span className="rounded-full bg-white px-3 py-1 text-xs text-gray-600">
            {remaining} requests left this hour
          </span>
        )}
      </div>

      {!signedIn ? (
        <p className="mt-5 rounded border bg-white p-4 text-sm">
          <Link to="/login" className="font-medium text-blue-700 underline">
            Sign in
          </Link>{' '}
          to use the AI tutor.
        </p>
      ) : (
        <>
          {messages.length === 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {[
                'Give me one hint',
                'Review my current approach',
                'What edge case should I consider?',
              ].map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => void send(prompt)}
                  className="rounded-full border border-cyan-300 bg-white px-3 py-2 text-sm text-cyan-900"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}
          {messages.length > 0 && (
            <div
              className="mt-5 max-h-96 space-y-3 overflow-auto"
              aria-live="polite"
            >
              {messages.map((message, index) => (
                <article
                  key={`${message.role}-${index}`}
                  className={
                    message.role === 'user'
                      ? 'ml-auto max-w-[85%] rounded-lg bg-cyan-800 p-3 text-sm text-white'
                      : 'mr-auto max-w-[90%] rounded-lg border bg-white p-4 text-sm text-gray-800'
                  }
                >
                  <p className="mb-1 text-xs font-semibold uppercase opacity-70">
                    {message.role === 'user' ? 'You' : 'Tutor'}
                  </p>
                  <div className="whitespace-pre-wrap leading-6">
                    {message.content}
                  </div>
                </article>
              ))}
            </div>
          )}
          {pending && (
            <p className="mt-3 text-sm text-gray-600" aria-live="polite">
              Tutor is thinking…
            </p>
          )}
          {error && (
            <p
              className="mt-3 rounded bg-red-50 p-3 text-sm text-red-700"
              role="alert"
            >
              {error}
            </p>
          )}
          <form onSubmit={submit} className="mt-5 flex gap-2">
            <label htmlFor="tutor-question" className="sr-only">
              Question for the AI tutor
            </label>
            <input
              id="tutor-question"
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              maxLength={2_000}
              placeholder="Ask for a hint or code review…"
              className="min-w-0 flex-1 rounded border bg-white px-3 py-2"
            />
            <button
              type="submit"
              disabled={pending || question.trim().length === 0}
              className="rounded bg-cyan-800 px-4 py-2 font-medium text-white disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </>
      )}
    </section>
  )
}
