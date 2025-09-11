import { deleteLink } from '@/app/services/delete-link'
import { isRight, unwrapEither } from '@/shared/either'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'

export const deleteLinkRoute: FastifyPluginAsyncZod = async (server) => {
  server.delete(
    '/links/:linkId',
    {
      schema: {
        summary: 'Delete a link',
        tags: ['Links'],
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

      const result = await deleteLink({ linkId })

      if (isRight(result)) {
        return reply.status(204).send()
      }

      const error = unwrapEither(result)

      return reply.status(404).send({ message: error.message })
    }
  )
}
