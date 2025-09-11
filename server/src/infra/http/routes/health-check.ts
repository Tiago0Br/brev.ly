import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const healthCheckRoute: FastifyPluginAsyncZod = async (server) => {
  server.get(
    '/',
    {
      schema: {
        summary: 'Health Check',
        tags: ['Health'],
        response: {
          200: z.object({
            status: z.string().describe('Status message indicating the API is running'),
          }),
        },
      },
    },
    async (_request, reply) => {
      return reply.status(200).send({ status: 'API is running!' })
    }
  )
}
