import { createBrowserRouter } from 'react-router-dom'
import { HomePage } from './pages/home'
import { RedirectPage } from './pages/redirect'

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/:shortenedUrl',
    element: <RedirectPage />,
  },
  {
    path: '*',
    element: <HomePage />,
  },
])
