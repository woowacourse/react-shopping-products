import {
  createContext,
  useContext,
  useRef,
  useState,
  ReactNode,
  useMemo,
  useCallback,
} from "react";
import { CategoryOptionType, OrderByOptionType } from "../types/categoryOption";
import type { DataKey, DataPoolMap } from "../types/data-types";

type DataPool = Partial<DataPoolMap>;

interface QueryCtx {
  dataPool: DataPool;
  setData: (key: DataKey, data: DataPoolMap[DataKey]) => void;
  controllers: React.MutableRefObject<Record<string, AbortController | null>>;
  productsQuery: OrderByOptionType;
  setProductsQuery: (q: OrderByOptionType) => void;
  categoryQuery: CategoryOptionType;
  setCategoryQuery: (q: CategoryOptionType) => void;
}

const QueryContext = createContext<QueryCtx | undefined>(undefined);

export const QueryContextProvider = ({ children }: { children: ReactNode }) => {
  const [dataPool, setDataPool] = useState<DataPool>({});

  const controllers = useRef<Record<string, AbortController | null>>({});

  const [productsQuery, _setProductsQuery] =
    useState<OrderByOptionType>("낮은 가격순");
  const [categoryQuery, _setCategoryQuery] =
    useState<CategoryOptionType>("전체");

  const setData = useCallback(
    (key: DataKey, value: DataPoolMap[DataKey]) =>
      setDataPool((prev) => {
        // 값이 동일하면 이전 상태 그대로 반환
        if (Object.is(prev[key], value)) {
          return prev;
        }
        // 아니면 key만 덮어쓴 새 객체 반환
        return { ...prev, [key]: value };
      }),
    []
  );

  const setProductsQuery = useCallback(
    (query: OrderByOptionType) => {
      _setProductsQuery(query);
    },
    [_setProductsQuery]
  );
  const setCategoryQuery = useCallback(
    (query: CategoryOptionType) => {
      _setCategoryQuery(query);
    },
    [_setCategoryQuery]
  );

  const value = useMemo(
    () => ({
      dataPool,
      setData,
      controllers,
      productsQuery,
      setProductsQuery,
      categoryQuery,
      setCategoryQuery,
    }),
    [
      dataPool,
      setData,
      controllers,
      productsQuery,
      setProductsQuery,
      categoryQuery,
      setCategoryQuery,
    ]
  );

  return (
    <QueryContext.Provider value={value}>{children}</QueryContext.Provider>
  );
};

export const useQueryContext = () => {
  const ctx = useContext(QueryContext);
  if (!ctx) throw new Error("useQueryContext must be inside QueryProvider");
  return ctx;
};
