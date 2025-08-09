import { env } from '@/env'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

export const pg = postgres(env.DB_URL)
export const db = drizzle(pg)
