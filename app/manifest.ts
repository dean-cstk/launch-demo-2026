import type { MetadataRoute } from 'next'
import { SITE_NAME, SEO_DESCRIPTION } from '@/lib/site-config'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: 'Launch',
    description: SEO_DESCRIPTION,
    start_url: '/',
    display: 'standalone',
    background_color: '#050505',
    theme_color: '#49A466',
    icons: [
      {
        src: '/icon.svg',
        type: 'image/svg+xml',
        sizes: 'any',
        purpose: 'any',
      },
    ],
  }
}
