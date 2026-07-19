import { createServerFn } from '@tanstack/react-start'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

import { db } from '../../db'
import { lessons, problems } from '../../db/schema'
import { ensureSession } from '../../lib/auth-functions'
import { requestGroqTutor } from './server'

const messageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string().min(1).max(2_000),
})

const requestSchema = z.object({
  contextType: z.enum(['problem', 'lesson']).default('problem'),
  contextSlug: z.string().min(1).max(160).optional(),
  problemSlug: z.string().min(1).max(160).optional(),
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
    const contextSlug = data.contextSlug ?? data.problemSlug
    if (!contextSlug) throw new Error('Tutor context not found.')

    const contextRows =
      data.contextType === 'lesson'
        ? await db
            .select({ title: lessons.title, description: lessons.summary })
            .from(lessons)
            .where(eq(lessons.slug, contextSlug))
            .limit(1)
        : await db
            .select({ title: problems.title, description: problems.description })
            .from(problems)
            .where(eq(problems.slug, contextSlug))
            .limit(1)
    if (contextRows.length === 0)
      throw new Error(data.contextType === 'lesson' ? 'Lesson not found.' : 'Problem not found.')

    const remainingRequests = consumeRequest(session.user.id)
    return requestGroqTutor({
      contextTitle: contextRows[0].title,
      contextDescription: contextRows[0].description,
      contextType: data.contextType,
      sourceCode: data.sourceCode,
      messages: data.messages,
      remainingRequests,
    })
  })
