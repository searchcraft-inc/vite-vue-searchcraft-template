/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENDPOINT_URL: string
  readonly VITE_INDEX_NAME: string
  readonly VITE_READ_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
