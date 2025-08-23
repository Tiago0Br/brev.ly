import { z } from 'zod'

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  DB_URL: z.url().startsWith('postgresql://'),
  CLOUDFLARE_ACCOUNT_ID: z.string().min(1, 'CLOUDFLARE_ACCOUNT_ID is required'),
  CLOUDFLARE_ACCESS_KEY_ID: z.string().min(1, 'CLOUDFLARE_ACCESS_KEY_ID is required'),
  CLOUDFLARE_SECRET_ACCESS_KEY: z
    .string()
    .min(1, 'CLOUDFLARE_SECRET_ACCESS_KEY is required'),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error('Invalid environment variables', _env.error.message)

  throw new Error('Invalid environment variables')
}

export const env = _env.data
