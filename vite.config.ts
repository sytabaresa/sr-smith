import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import tsconfigPaths from "vite-tsconfig-paths"
import { ssr } from 'vite-plugin-ssr/plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), tsconfigPaths(), ssr({ prerender: true })],
  // We manually add a list of dependencies to be pre-bundled, in order to avoid a page reload at dev start which breaks vite-plugin-ssr's CI
  optimizeDeps: {
    include: ['preact', 'preact/devtools', 'preact/debug', 'preact/jsx-dev-runtime', 'preact/hooks']
  },
  resolve: {
    alias: {
      'react': 'preact/compat',
      'react-dom': 'preact/compat'
    }
  },
  ssr: {
    // Add libraries containing invalid ESM here
    noExternal: ['workbox-window', 'react-responsive', '@heroicons/react']
  }
})
