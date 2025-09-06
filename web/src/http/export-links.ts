import { api } from '@/lib/axios'

interface ExportLinksResponse {
  reportUrl: string
}

export async function exportLinks() {
  const response = await api.post<ExportLinksResponse>('/links/export')
  return {
    reportUrl: response.data.reportUrl,
  }
}
