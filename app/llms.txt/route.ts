import { getSiteUrl, SITE_NAME, SEO_DESCRIPTION } from '@/lib/site-config'

export const dynamic = 'force-static'

export function GET() {
  const base = getSiteUrl().origin

  const body = `# ${SITE_NAME}

> ${SEO_DESCRIPTION}

This is a single-page demo showcasing high-performance frontend hosting on
Contentstack Launch: deployed straight from source, served from the edge,
with no build steps for visitors to worry about.

## Docs

- [Launch Documentation](https://www.contentstack.com/docs/developers/launch): How Contentstack Launch deploys, hosts, and scales Next.js apps.
- [Launch API Reference](https://www.contentstack.com/docs/developers/apis/launch-api): API reference for automating Launch deployments and environments.

## Source

- [GitHub Repository](https://github.com/dean-cstk/launch-demo-2026): Source code for this demo.

## Site

- [${base}](${base}): The live demo homepage.
`

  return new Response(body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
    },
  })
}
