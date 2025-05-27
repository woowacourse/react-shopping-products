/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_MOCK_MODE: 'true' | 'false';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
