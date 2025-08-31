import { z } from 'zod'

const _env = z.object({
  VITE_API_URL: z.url(),
})

const { success, data, error } = _env.safeParse(import.meta.env)

if (!success) {
  throw new Error(`Invalid environment variables: ${error.message}`)
}

export const env = data
