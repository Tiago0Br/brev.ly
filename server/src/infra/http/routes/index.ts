import { createLinkRoute } from './create-link'
import { deleteLinkRoute } from './delete-link'
import { exportLinksRoute } from './export-links'
import { getAllLinksRoute } from './get-all-links'
import { getOriginalUrlRoute } from './get-original-url'
import { healthCheckRoute } from './health-check'

export const routes = [
  healthCheckRoute,
  createLinkRoute,
  deleteLinkRoute,
  getAllLinksRoute,
  getOriginalUrlRoute,
  exportLinksRoute,
]
