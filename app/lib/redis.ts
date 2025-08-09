import { Redis } from '@upstash/redis'

if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
  throw new Error('Missing required Upstash Redis environment variables')
}

export const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
})

// Redis key prefixes
export const REDIS_KEYS = {
  VIEW_COUNT: (slug: string) => `views:${slug}`,
  ALL_VIEWS: 'views:*',
} as const
