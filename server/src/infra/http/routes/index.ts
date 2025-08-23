import { createLinkRoute } from './create-link'
import { deleteLinkRoute } from './delete-link'
import { exportLinksRoute } from './export-links'
import { getAllLinksRoute } from './get-all-links'
import { getOriginalUrl } from './get-original-url'

export const routes = [
  createLinkRoute,
  deleteLinkRoute,
  getAllLinksRoute,
  getOriginalUrl,
  exportLinksRoute,
]
