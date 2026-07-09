/**
 * Server-only client for the Contentstack Content Delivery API.
 * Reads connection settings from env vars — never import this from client code.
 */

export type StackConfig = {
  cdnHost: string
  apiKey: string
  deliveryToken: string
  environment: string
  apiHost: string | null
}

export type StackConfigResult =
  | { ok: true; config: StackConfig }
  | { ok: false; error: string }

const REQUIRED_ENV_VARS = [
  'CONTENTSTACK_CDN',
  'CONTENTSTACK_API_KEY',
  'CONTENTSTACK_DELIVERY_TOKEN',
  'CONTENTSTACK_ENVIRONMENT',
] as const

export function readStackConfig(): StackConfigResult {
  const cdnHost = process.env.CONTENTSTACK_CDN?.trim()
  const apiKey = process.env.CONTENTSTACK_API_KEY?.trim()
  const deliveryToken = process.env.CONTENTSTACK_DELIVERY_TOKEN?.trim()
  const environment = process.env.CONTENTSTACK_ENVIRONMENT?.trim()
  const apiHost = process.env.CONTENTSTACK_API_HOST?.trim()

  const values = { CONTENTSTACK_CDN: cdnHost, CONTENTSTACK_API_KEY: apiKey, CONTENTSTACK_DELIVERY_TOKEN: deliveryToken, CONTENTSTACK_ENVIRONMENT: environment }
  const missing = REQUIRED_ENV_VARS.filter((name) => !values[name as keyof typeof values])

  if (missing.length > 0) {
    return { ok: false, error: `Missing required environment variable(s): ${missing.join(', ')}` }
  }

  return {
    ok: true,
    config: {
      cdnHost: cdnHost!,
      apiKey: apiKey!,
      deliveryToken: deliveryToken!,
      environment: environment!,
      apiHost: apiHost || null,
    },
  }
}

function toBaseUrl(host: string): string {
  const trimmed = host.trim().replace(/\/+$/, '')
  return trimmed.startsWith('http://') || trimmed.startsWith('https://') ? trimmed : `https://${trimmed}`
}

async function cdaFetch(
  config: StackConfig,
  path: string,
  searchParams: Record<string, string> = {}
): Promise<any> {
  const url = new URL(`${toBaseUrl(config.cdnHost)}${path}`)
  url.searchParams.set('environment', config.environment)
  for (const [key, value] of Object.entries(searchParams)) {
    url.searchParams.set(key, value)
  }

  let res: Response
  try {
    res = await fetch(url.toString(), {
      headers: {
        api_key: config.apiKey,
        access_token: config.deliveryToken,
      },
      cache: 'no-store',
    })
  } catch {
    throw new Error('Could not reach the Contentstack Content Delivery API. Check CONTENTSTACK_CDN and network access.')
  }

  if (!res.ok) {
    if (res.status === 401 || res.status === 403) {
      throw new Error('Contentstack rejected the credentials. Check CONTENTSTACK_API_KEY and CONTENTSTACK_DELIVERY_TOKEN.')
    }
    if (res.status === 404) {
      throw new Error('Contentstack stack or environment not found. Check CONTENTSTACK_ENVIRONMENT and CONTENTSTACK_CDN.')
    }
    throw new Error(`Contentstack API responded with ${res.status} ${res.statusText}.`)
  }

  return res.json()
}

export type StackSummary = {
  contentTypesCount: number
  entriesCount: number
  assetsCount: number
  contentTypes: { uid: string; title: string; entryCount: number }[]
  environment: string
  apiHost: string | null
}

const CONTENT_TYPES_DISPLAY_LIMIT = 100

export async function fetchStackSummary(config: StackConfig): Promise<StackSummary> {
  const [contentTypesRes, assetsRes] = await Promise.all([
    cdaFetch(config, '/content_types', { include_count: 'true', limit: String(CONTENT_TYPES_DISPLAY_LIMIT) }),
    cdaFetch(config, '/assets', { include_count: 'true', limit: '1' }),
  ])

  const contentTypes: Array<{ uid: string; title: string }> = contentTypesRes.content_types ?? []
  const contentTypesCount: number =
    typeof contentTypesRes.count === 'number' ? contentTypesRes.count : contentTypes.length
  const assetsCount: number = typeof assetsRes.count === 'number' ? assetsRes.count : 0

  const contentTypesWithCounts = await Promise.all(
    contentTypes.map(async (ct) => {
      try {
        const entriesRes = await cdaFetch(config, `/content_types/${ct.uid}/entries`, {
          include_count: 'true',
          limit: '1',
        })
        const entryCount = typeof entriesRes.count === 'number' ? entriesRes.count : 0
        return { uid: ct.uid, title: ct.title, entryCount }
      } catch {
        return { uid: ct.uid, title: ct.title, entryCount: 0 }
      }
    })
  )

  const entriesCount = contentTypesWithCounts.reduce((sum, ct) => sum + ct.entryCount, 0)

  return {
    contentTypesCount,
    entriesCount,
    assetsCount,
    contentTypes: contentTypesWithCounts,
    environment: config.environment,
    apiHost: config.apiHost,
  }
}
