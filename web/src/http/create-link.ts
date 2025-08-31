import { api } from '@/lib/axios'

interface CreateLinkRequest {
  originalUrl: string
  shortenedUrl: string
}

export async function createLink({ originalUrl, shortenedUrl }: CreateLinkRequest) {
  await api.post('/links', {
    originalUrl,
    shortenedUrl,
  })
}
