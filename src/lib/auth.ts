import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { tanstackStartCookies } from 'better-auth/tanstack-start'

import { db } from '../db'
import * as schema from '../db/schema'

const configuredOrigin = process.env.BETTER_AUTH_URL
const developmentOrigins = ['http://localhost:3000', 'http://127.0.0.1:3000']

export const auth = betterAuth({
  ...(configuredOrigin ? { baseURL: configuredOrigin } : {}),
  trustedOrigins: [
    ...(configuredOrigin ? [configuredOrigin] : []),
    ...(process.env.NODE_ENV === 'production' ? [] : developmentOrigins),
  ],
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      ...schema,
      user: schema.users,
      session: schema.sessions,
      account: schema.accounts,
      verification: schema.verifications,
    },
    usePlural: true,
  }),
  emailAndPassword: { enabled: true },
  user: {
    fields: { name: 'username' },
  },
  advanced: { database: { generateId: 'uuid' } },
  plugins: [tanstackStartCookies()],
})
