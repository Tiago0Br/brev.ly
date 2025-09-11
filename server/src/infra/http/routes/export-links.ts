import { exportLinks } from '@/app/services/export-links'
import { unwrapEither } from '@/shared/either'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'

export const exportLinksRoute: FastifyPluginAsyncZod = async (server) => {
  server.post(
    '/links/export',
    {
      schema: {
        summary: 'Export all links into a CSV file',
        tags: ['Links'],
        response: {
          200: z.object({
            reportUrl: z.url().describe('The URL of the generated report'),
          }),
        },
      },
    },
    async (_request, reply) => {
      const result = await exportLinks()
      const { reportUrl } = unwrapEither(result)

      reply.status(200).send({ reportUrl })
    }
  )
}
