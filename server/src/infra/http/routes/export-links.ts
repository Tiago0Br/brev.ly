import { exportLinks } from '@/app/services/export-links'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'

export const exportLinksRoute: FastifyPluginAsyncZod = async (server) => {
  server.post(
    '/links/export',
    {
      schema: {
        summary: 'Export all links into a CSV file',
        tags: ['links'],
        response: {
          200: z.object({
            reportUrl: z.url().describe('The URL of the generated report'),
          }),
        },
      },
    },
    async (_request, reply) => {
      const { reportUrl } = await exportLinks()
      reply.status(200).send({ reportUrl })
    }
  )
}
