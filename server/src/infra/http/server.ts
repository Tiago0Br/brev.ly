import { env } from '@/env'
import fastifyCors from '@fastify/cors'
import fastifySwagger from '@fastify/swagger'
import fastifyApiReference from '@scalar/fastify-api-reference'
import fastify from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { createShortenedLinkRoute } from './routes/create-shortened-link'
import { deleteShortenedLinkRoute } from './routes/delete-shortened-link'
import { exportLinksRoute } from './routes/export-links'
import { getAllLinksRoute } from './routes/get-all-links'
import { getOriginalUrlByShortenedUrlRoute } from './routes/get-original-url-by-shortened-url'

const server = fastify()

server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

server.register(fastifyCors, { origin: '*' })
server.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Brev.ly Server',
      description: 'The API documentation for the Brev.ly URL shortening service',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
})

server.register(createShortenedLinkRoute)
server.register(deleteShortenedLinkRoute)
server.register(getAllLinksRoute)
server.register(getOriginalUrlByShortenedUrlRoute)
server.register(exportLinksRoute)

server.register(fastifyApiReference, {
  routePrefix: '/docs',
  configuration: {
    theme: 'kepler',
  },
})

server
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() => {
    console.log(`🚀 HTTP server running on http://localhost:${env.PORT}`)
  })
