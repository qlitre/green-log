import client from 'honox/vite/client'
import adapter from '@hono/vite-dev-server/cloudflare'
import honox from 'honox/vite'
import { defineConfig } from 'vite'
import pages from '@hono/vite-cloudflare-pages'

export default defineConfig(({ mode }) => {
  if (mode === 'client') {
    return {
      plugins: [client()],
      build: {
        rollupOptions: {
          input: ["/app/style.css"]
        },
      },
    }
  }
  return {
    server: {
      watch: {
        ignored: ['**/C:/DumpStack.log.tmp', '**/C:\\DumpStack.log.tmp'],
        usePolling: true, // ポーリングベースの監視に切り替え
        interval: 1000    // ポーリングの間隔を調整
      }
    },
    plugins: [honox({
      devServer: {
        adapter,
      },
    }), pages()],
    ssr: {
      external: ['fire-base', 'dayjs'],
    },
  }
})