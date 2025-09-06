import { api } from '@/lib/axios'

interface GetOriginalUrlRequest {
  shortenedUrl: string
}

interface GetOriginalUrlResponse {
  originalUrl: string
}

export async function getOriginalUrl({ shortenedUrl }: GetOriginalUrlRequest) {
  const response = await api.get<GetOriginalUrlResponse>(`/${shortenedUrl}`)
  return {
    originalUrl: response.data.originalUrl,
  }
}
