import { db } from '@/infra/database'
import { schema } from '@/infra/database/schemas'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'

export const getAllLinksRoute: FastifyPluginAsyncZod = async (server) => {
  server.get(
    '/links',
    {
      schema: {
        summary: 'Get all links',
        tags: ['Links'],
        response: {
          200: z.object({
            data: z
              .array(
                z.object({
                  id: z.uuidv7().describe('Unique identifier for the link'),
                  originalUrl: z.url().describe('Original URL before shortening'),
                  shortenedUrl: z.string().describe('Shortened URL'),
                })
              )
              .describe('Array of links'),
          }),
        },
      },
    },
    async (_request, reply) => {
      const links = await db
        .select({
          id: schema.links.id,
          originalUrl: schema.links.originalUrl,
          shortenedUrl: schema.links.shortenedUrl,
        })
        .from(schema.links)
      return reply.status(200).send({
        data: links,
      })
    }
  )
}
