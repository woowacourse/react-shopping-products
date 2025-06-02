interface ApiState<T> {
  data: T;
  loading: boolean;
  error: string;
  category?: string;
  sort?: string;
}

interface ApiContextState<T> {
  [key: string]: ApiState<T>;
}

export type { ApiState, ApiContextState };
