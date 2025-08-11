import { db } from '@/infra/database'
import { schema } from '@/infra/database/schemas'
import { eq } from 'drizzle-orm'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'

export const deleteShortenedLinkRoute: FastifyPluginAsyncZod = async (server) => {
  server.delete(
    '/links/delete/:linkId',
    {
      schema: {
        summary: 'Delete a shortened link',
        tags: ['links'],
        params: z.object({
          linkId: z.uuidv7({ error: 'Invalid UUID' }),
        }),
        response: {
          204: z.void(),
          404: z.object({
            message: z.string().describe('Error message if link not found'),
          }),
        },
      },
    },
    async (request, reply) => {
      const { linkId } = request.params

      const link = await db.select().from(schema.links).where(eq(schema.links.id, linkId))

      if (link.length === 0) {
        return reply.status(404).send({ message: 'Link not found' })
      }

      await db.delete(schema.links).where(eq(schema.links.id, linkId))

      return reply.status(204).send()
    }
  )
}
