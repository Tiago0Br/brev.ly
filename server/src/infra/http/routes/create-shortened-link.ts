import { createLink } from '@/app/services/create-link'
import { validateUrlPath } from '@/utils/validate-url-path'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const createShortenedLinkRoute: FastifyPluginAsyncZod = async (server) => {
  server.post(
    '/links/create',
    {
      schema: {
        summary: 'Create a shortened link',
        tags: ['links'],
        body: z.object({
          originalUrl: z.url({ error: 'Invalid URL format' }),
          shortenedUrl: z
            .string({ error: 'Shortened URL must be a string' })
            .refine(validateUrlPath, {
              message: 'URL path contains invalid characters',
            }),
        }),
        response: {
          201: z.object({
            message: z.string().describe('Success message for link creation'),
          }),
          400: z.object({
            message: z.string().describe('Validation error'),
          }),
        },
      },
    },
    async (request, reply) => {
      const { originalUrl, shortenedUrl } = request.body

      await createLink({ originalUrl, shortenedUrl })

      return reply.status(201).send({ message: 'Link created successfully' })
    }
  )
}
