import { createServerFn } from '@tanstack/react-start'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

import { db } from '../../db'
import { problems } from '../../db/schema'
import { ensureSession } from '../../lib/auth-functions'
import { requestGroqTutor } from './server'

const messageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string().min(1).max(2_000),
})

const requestSchema = z.object({
  problemSlug: z.string().min(1).max(160),
  sourceCode: z.string().min(1).max(20_000),
  messages: z.array(messageSchema).min(1).max(8),
})

const RATE_LIMIT = 12
const WINDOW_MS = 60 * 60 * 1_000
const requestsByUser = new Map<string, number[]>()

function consumeRequest(userId: string) {
  const now = Date.now()
  const recent = (requestsByUser.get(userId) ?? []).filter(
    (timestamp) => now - timestamp < WINDOW_MS,
  )
  if (recent.length >= RATE_LIMIT)
    throw new Error(
      'AI tutor limit reached. Try again after the hourly window resets.',
    )
  recent.push(now)
  requestsByUser.set(userId, recent)
  return RATE_LIMIT - recent.length
}

export const askTutor = createServerFn({ method: 'POST' })
  .validator(requestSchema)
  .handler(async ({ data }) => {
    const session = await ensureSession()
    const problemRows = await db
      .select({ title: problems.title, description: problems.description })
      .from(problems)
      .where(eq(problems.slug, data.problemSlug))
      .limit(1)
    if (problemRows.length === 0) throw new Error('Problem not found.')

    const remainingRequests = consumeRequest(session.user.id)
    return requestGroqTutor({
      problemTitle: problemRows[0].title,
      problemDescription: problemRows[0].description,
      sourceCode: data.sourceCode,
      messages: data.messages,
      remainingRequests,
    })
  })
