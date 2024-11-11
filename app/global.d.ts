import { } from 'hono'

type Head = {
  title?: string;
  description?: string;
  contentUrl?: string;
  thumbnailUrl?: string;
  ogtype?: 'website' | 'article'
}

type Bindings = {
  DB: D1Database;
  MY_BUCKET: R2Bucket;
  API_KEY: string;
  AUTH_DOMAIN: string;
  PROJECT_ID: string;
  STORAGE_BUCKET: string;
  MASSAGING_SENDER_ID: string;
  APP_ID: string;
}

declare module 'hono' {
  interface Env {
    Variables: {}
    Bindings: Bindings
  }
  interface ContextRenderer {
    (content: string | Promise<string>, head?: Head): Response | Promise<Response>
  }
}
