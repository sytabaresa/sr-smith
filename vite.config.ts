import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import tsconfigPaths from "vite-tsconfig-paths"
import { ssr } from 'vite-plugin-ssr/plugin'
import { VitePWA } from 'vite-plugin-pwa'
import { visualizer } from "rollup-plugin-visualizer";
// import legacy from '@vitejs/plugin-legacy'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }) => ({
  server: {
    headers: {
      'service-worker-allowed': '/'
    }
  },
  ...((command == 'serve') && {
    define: {
      global: {},
    }
  }),
  preview: {
    headers: {
      'service-worker-allowed': '/'
    }
  },
  plugins: [
    preact(),
    tsconfigPaths(),
    ssr({ prerender: true }),
    // legacy({
    //   modernPolyfills: true,
    //   targets: [
    //     "> 0.5%",
    //     "last 1 version",
    //     "Edge >= 16",
    //     "Opera >= 58",
    //     "Safari >= 10.1",
    //     "Firefox >= 52",
    //     "Chrome >= 57",
    //     "iOS >= 11",
    //     "Samsung >= 8",
    //     "ChromeAndroid >= 71",
    //     "Android >= 4.3",
    //     "not dead",
    //   ],
    // }),
    VitePWA({
      srcDir: 'src/modules/pwa',
      registerType: 'autoUpdate',
      strategies: 'injectManifest',
      filename: 'service-worker.ts',
      injectRegister: null,
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
        }],
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
      template: 'treemap',
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
    noExternal: command == 'serve' ? ['react-hotkeys-hook','react-robot', 'robot3', 'typesafe-i18n'] : ['react-hotkeys-hook', 'workbox-window', 'react-responsive', '@heroicons/react']
  }
}))
