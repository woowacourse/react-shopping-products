export interface FetchOptions {
  autoFetch?: boolean;
  deps?: unknown[];
  retryCount?: number;
  retryDelay?: number;
}

export interface FetchResult<T> {
  data: T;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}
