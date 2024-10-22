import { Style } from 'hono/css'
import { jsxRenderer } from 'hono/jsx-renderer'
import { Script, Link } from 'honox/server'
import { Header } from '../components/Header'
import { config } from '../settings/siteSettings'

export default jsxRenderer(({ children, title, description, contentUrl, thumbnailUrl, ogtype }) => {
  const _contentUrl = contentUrl ? contentUrl : config.siteURL
  const _title = title ? title : config.siteTitle
  const _description = description ? description : config.siteDescription
  const _ogtype = ogtype ? ogtype : 'website'
  return (
    <html lang="ja">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={_description}></meta>
        <meta property="og:url" content={_contentUrl} />
        <meta property="og:type" content={_ogtype} />
        <meta property="og:title" content={_title} />
        <meta property="og:description" content={_description} />
        <meta property="og:site_name" content='QLITRE GREEN DIARY' />
        <meta property="og:image" content={thumbnailUrl} />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="600" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@kuri_tter" />
        <meta name="twitter:title" content={_title} />
        <meta name="twitter:description" content={_description} />
        <meta
          name="twitter:image"
          content={thumbnailUrl}
        />
        <title>{_title}</title>
        <link rel="icon" href="/favicon.ico" />
        <Link href="/app/style.css" rel="stylesheet" />
        <Script src="/app/client.ts" async />
        <Style />
      </head>
      <body>
        <Header></Header>
        {children}
      </body>
    </html>
  )
})
