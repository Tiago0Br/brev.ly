import { db } from '@/infra/database'
import { schema } from '@/infra/database/schemas'
import { makeLeft, makeRight } from '@/shared/either'
import { eq } from 'drizzle-orm'
import { LinkNotFound } from '../errors/link-not-found'

interface DeleteLinkProps {
  linkId: string
}

export async function deleteLink({ linkId }: DeleteLinkProps) {
  const links = await db.select().from(schema.links).where(eq(schema.links.id, linkId))

  if (links.length === 0) {
    return makeLeft(LinkNotFound.throw())
  }

  await db.delete(schema.links).where(eq(schema.links.id, linkId))

  return makeRight(null)
}
