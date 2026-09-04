/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string
  readonly VITE_TELECRM_ENTERPRISE_ID?: string
  readonly VITE_TELECRM_TOKEN?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
