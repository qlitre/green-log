import { } from 'hono'

type Head = {
  title?: string;
  description?: string;
  contentUrl?: string;
  thumbnailUrl?: string;
}

type Bindings = {
  DB: D1Database;
  MY_BUCKET: R2Bucket;
  PROJECT_URL: string;
  API_KEY: string;
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
