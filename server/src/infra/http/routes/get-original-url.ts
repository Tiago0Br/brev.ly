import { getOriginalUrl } from '@/app/services/get-original-url'
import { isRight, unwrapEither } from '@/shared/either'
import { validateUrlPath } from '@/utils/validate-url-path'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const getOriginalUrlRoute: FastifyPluginAsyncZod = async (server) => {
  server.get(
    '/links/:shortenedUrl',
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

      const result = await getOriginalUrl({ shortenedUrl })

      if (isRight(result)) {
        const { originalUrl } = unwrapEither(result)
        return reply.status(200).send({ originalUrl })
      }

      const error = unwrapEither(result)

      return reply.status(404).send({ message: error.message })
    }
  )
}
