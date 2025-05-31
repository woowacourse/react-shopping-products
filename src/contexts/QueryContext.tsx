import { createContext, useContext } from "react";

interface QueryState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}
type Subscriber = () => void;

// 저장소 (js 기반 / 상태 x -> provider에서 관리하는 건 일반 변수이기 떄문에 렌더링 x)
const store: Record<
  string,
  {
    state: QueryState<any>;
    subscribers: Set<Subscriber>;
  }
> = {};

// 하위 컴포넌트에서 공유할 context
interface QueryContextType {
  get: <T>(queryKey: string) => QueryState<T> | undefined;
  subscribe: (queryKey: string, reRenderFn: Subscriber) => void;
  unsubscribe: (queryKey: string, reRenderFn: Subscriber) => void;
  refetch: <T>(queryKey: string, fn: () => Promise<T>) => Promise<void>;
}

const QueryContext = createContext<QueryContextType | null>(null);

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  const get = (queryKey: string) => {
    if (store[queryKey]) return store[queryKey].state;
  };

  const subscribe = (queryKey: string, reRenderFn: Subscriber) => {
    if (!store[queryKey]) {
      store[queryKey] = { state: { data: null, isLoading: false, error: null }, subscribers: new Set() };
    }
    store[queryKey].subscribers.add(reRenderFn);
  };

  const unsubscribe = (queryKey: string, reRenderFn: Subscriber) => {
    store[queryKey].subscribers.delete(reRenderFn);
  };

  const notify = (queryKey: string) => {
    store[queryKey].subscribers.forEach((fn) => fn());
  };

  const refetch = async function <T>(queryKey: string, fn: () => Promise<T>) {
    store[queryKey].state = { data: null, isLoading: true, error: null };

    try {
      const result = await fn();
      store[queryKey].state = { data: result, isLoading: false, error: null };
    } catch (e) {
      if (e instanceof Error) store[queryKey].state = { data: null, isLoading: false, error: e };
    } finally {
      notify(queryKey);
    }
  };

  return <QueryContext.Provider value={{ get, subscribe, unsubscribe, refetch }}>{children}</QueryContext.Provider>;
};

export const useQueryClient = () => {
  const context = useContext(QueryContext);
  if (!context) throw new Error("useQuery must be used within an QueryProvider");
  return context;
};
