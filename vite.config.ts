import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import tsconfigPaths from "vite-tsconfig-paths"
import { ssr } from 'vite-plugin-ssr/plugin'
import { VitePWA } from 'vite-plugin-pwa'
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }) => ({
  server: {
    headers: {
      'service-worker-allowed': '/'
    }
  },
  preview: {
    headers: {
      'service-worker-allowed': '/'
    }
  },
  plugins: [
    preact(),
    tsconfigPaths(),
    ssr({ prerender: true }),
    VitePWA({
      srcDir: 'src/modules/pwa',
      registerType: 'autoUpdate',
      strategies: 'injectManifest',
      filename: 'service-worker.ts',
      injectRegister: 'auto',
      // devOptions: {
      //   enabled: true,
      // },
      manifest: {
        "name": "Sr Smith",
        "short_name": "Sr-smith",
        "icons": [{
          "src": "/pwa/manifest-icon-192.maskable.png",
          "sizes": "192x192",
          "type": "image/png",
          "purpose": "any"
        },
        {
          "src": "/pwa/manifest-icon-192.maskable.png",
          "sizes": "192x192",
          "type": "image/png",
          "purpose": "maskable"
        },
        {
          "src": "/pwa/manifest-icon-512.maskable.png",
          "sizes": "512x512",
          "type": "image/png",
          "purpose": "any"
        },
        {
          "src": "/pwa/manifest-icon-512.maskable.png",
          "sizes": "512x512",
          "type": "image/png",
          "purpose": "maskable"
        }
        ],
        "theme_color": "#FFFFFF",
        "background_color": "#FFFFFF",
        "start_url": "/",
        "display": "standalone",
        "orientation": "portrait"
      }
    }),
    visualizer({
      // emitFile: true,
      // filename: "stats.html",
      // template: 'sunburst'
    }),
  ],
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
    noExternal: command == 'serve' ? ['react-robot'] : ['workbox-window', 'react-responsive', '@heroicons/react']
  }
}))
