import { createLink } from '@/app/services/create-link'
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
            .string()
            .refine((url) => url.startsWith('brev.ly/') && url.length > 8, {
              message: 'URL must start with "brev.ly/" and have a valid path',
            })
            .refine(
              (url) => /^[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=%/]+$/.test(url.slice(8)),
              {
                message: 'URL path contains invalid characters',
              }
            )
            .toLowerCase(),
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
