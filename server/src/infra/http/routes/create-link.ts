import { createLink } from '@/app/services/create-link'
import { isRight, unwrapEither } from '@/shared/either'
import { validateUrlPath } from '@/utils/validate-url-path'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const createLinkRoute: FastifyPluginAsyncZod = async (server) => {
  server.post(
    '/links',
    {
      schema: {
        summary: 'Create a shortened URL for a given link',
        tags: ['Links'],
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
          409: z.object({
            message: z
              .string()
              .describe('Conflict error when shortened URL already exists'),
          }),
        },
      },
    },
    async (request, reply) => {
      const { originalUrl, shortenedUrl } = request.body

      const result = await createLink({ originalUrl, shortenedUrl })

      if (isRight(result)) {
        return reply.status(201).send({ message: 'Link created successfully' })
      }

      const error = unwrapEither(result)

      return reply.status(409).send({ message: error.message })
    }
  )
}
