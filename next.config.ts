import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const nextConfig: NextConfig = {
  outputFileTracingRoot: __dirname,
  poweredByHeader: false,
  compress: true,
  experimental: {
    inlineCss: true,
  },
  webpack: (config, { isServer, webpack: wp }) => {
    if (!isServer) {
      config.plugins!.push(
        new wp.NormalModuleReplacementPlugin(
          /polyfills[/\\]polyfill-module\.js$/,
          path.join(__dirname, 'lib/modern-client-polyfill.js')
        )
      )
    }
    return config
  },
}

export default nextConfig
