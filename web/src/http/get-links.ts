import { api } from '@/lib/axios'

interface GetLinksResponse {
  data: {
    id: string
    originalUrl: string
    shortenedUrl: string
    accessCount: number
  }[]
}

export async function getLinks() {
  const response = await api.get<GetLinksResponse>('/links')
  const { data } = response.data

  return data
}
