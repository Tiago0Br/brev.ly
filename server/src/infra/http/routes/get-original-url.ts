import { db } from '@/infra/database'
import { schema } from '@/infra/database/schemas'
import { validateUrlPath } from '@/utils/validate-url-path'
import { eq } from 'drizzle-orm'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const getOriginalUrl: FastifyPluginAsyncZod = async (server) => {
  server.get(
    '/:shortenedUrl',
    {
      schema: {
        summary: 'Get the original URL by shortened URL',
        tags: ['Links'],
        params: z.object({
          shortenedUrl: z
            .string({ error: 'Shortened URL must be a string' })
            .refine(validateUrlPath, {
              message: 'Shortened URL contains invalid characters',
            }),
        }),
        response: {
          200: z.object({
            originalUrl: z
              .string()
              .describe('The original URL associated with the shortened URL'),
          }),
          404: z.object({
            message: z
              .string()
              .describe('Error message if the shortened URL does not exist'),
          }),
        },
      },
    },
    async (request, reply) => {
      const { shortenedUrl } = request.params

      const [link] = await db
        .select({
          originalUrl: schema.links.originalUrl,
          accessCount: schema.links.accessCount,
        })
        .from(schema.links)
        .where(eq(schema.links.shortenedUrl, shortenedUrl))
        .limit(1)

      if (!link) {
        return reply.status(404).send({ message: 'URL not found' })
      }

      await db
        .update(schema.links)
        .set({ accessCount: (link.accessCount ?? 0) + 1 })
        .where(eq(schema.links.shortenedUrl, shortenedUrl))

      return reply.status(200).send({ originalUrl: link.originalUrl })
    }
  )
}
