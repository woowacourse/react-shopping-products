import {
  createContext,
  useContext,
  useRef,
  useState,
  ReactNode,
  useMemo,
  useCallback,
} from "react";
import { OrderByOptionType } from "../types/categoryOption";
import type { DataKey, DataPoolMap } from "../types/data-types";

type DataPool = Partial<DataPoolMap>;

interface QueryCtx {
  dataPool: DataPool;
  setData: (key: DataKey, data: DataPoolMap[DataKey]) => void;
  controllers: React.MutableRefObject<Record<string, AbortController | null>>;
  productsQuery: OrderByOptionType;
  setProductsQuery: (q: OrderByOptionType) => void;
}

const QueryContext = createContext<QueryCtx | undefined>(undefined);

export const QueryContextProvider = ({ children }: { children: ReactNode }) => {
  const [dataPool, setDataPool] = useState<DataPool>({});

  const controllers = useRef<Record<string, AbortController | null>>({});

  const [productsQuery, _setProductsQuery] =
    useState<OrderByOptionType>("낮은 가격순");

  const setData = useCallback(
    (key: DataKey, value: DataPoolMap[DataKey]) =>
      setDataPool((prev) => ({ ...prev, [key]: value })),
    []
  );
  const setProductsQuery = useCallback(
    (query: OrderByOptionType) => {
      _setProductsQuery(query);
    },
    [_setProductsQuery]
  );

  const value = useMemo(
    () => ({ dataPool, setData, controllers, productsQuery, setProductsQuery }),
    [dataPool, setData, controllers, productsQuery, setProductsQuery]
  );

  return (
    <QueryContext.Provider value={{ ...value }}>
      {children}
    </QueryContext.Provider>
  );
};

export const useQueryContext = () => {
  const ctx = useContext(QueryContext);
  if (!ctx) throw new Error("useQueryContext must be inside QueryProvider");
  return ctx;
};
