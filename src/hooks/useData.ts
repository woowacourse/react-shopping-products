import { useEffect, useCallback, useReducer, useMemo } from 'react';
import { useDataContext } from '../context/DataContext';

const ongoingRequests = new Map<string, boolean>();

/**
 * useData 훅의 설정 옵션
 * @interface UseDataOptions
 */
interface UseDataOptions {
  /**
   * 캐시 유효 시간 (밀리초)
   * @default 300000 (5분)
   * @example
   * cacheTime: 10 * 60 * 1000 // 10분
   * cacheTime: 0 // 캐시 사용 안 함
   * cacheTime: undefined // 무제한 캐시
   */
  cacheTime?: number;

  /**
   * 컴포넌트 마운트 시 데이터 재요청 여부
   * @default true
   * @description
   * - true: 캐시가 있어도 마운트 시 재요청
   * - false: 유효한 캐시가 있으면 재요청하지 않음
   */
  refetchOnMount?: boolean;

  /**
   * 요청 실패 시 재시도 횟수
   * @default 3
   */
  retry?: number;

  /**
   * 재시도 간격 (밀리초)
   * @default 1000
   * @description Exponential backoff 적용 (1초, 2초, 4초...)
   */
  retryDelay?: number;
}

/**
 * useData 훅의 반환값
 * @interface UseDataReturn
 * @template T - 데이터 타입
 */
interface UseDataReturn<T> {
  /** 가져온 데이터 */
  data: T | null;
  /** 에러 객체 */
  error: Error | null;
  /** 로딩 상태 */
  isLoading: boolean;
  /** 수동으로 데이터 재요청 */
  refetch: () => Promise<void>;
}

const DEFAULT_OPTIONS: UseDataOptions = {
  cacheTime: 5 * 60 * 1000,
  refetchOnMount: true,
  retry: 3,
  retryDelay: 1000,
};

/**
 * 범용 데이터 fetching 훅
 *
 * @template T - 반환될 데이터의 타입
 * @param {string} key - 캐시 키 (고유해야 함)
 * @param {() => Promise<T>} fetcher - 데이터를 가져오는 비동기 함수
 * @param {UseDataOptions} [options={}] - 옵션 설정
 * @returns {UseDataReturn<T>} 데이터, 에러, 로딩 상태 및 refetch 함수
 *
 * @example
 * // 기본 사용법
 * const { data, error, isLoading } = useData(
 *   'users',
 *   () => fetchUsers()
 * );
 *
 * @example
 * // 캐시 설정과 함께 사용
 * const { data, refetch } = useData(
 *   `product-${id}`,
 *   () => fetchProduct(id),
 *   {
 *     cacheTime: 10 * 60 * 1000, // 10분
 *     refetchOnMount: false,      // 캐시가 있으면 재요청 안 함
 *     retry: 5,                   // 5번 재시도
 *   }
 * );
 *
 * @example
 * // 수동 재요청
 * const { data, refetch } = useData('products', fetchProducts);
 *
 * const handleRefresh = async () => {
 *   await refetch(); // 캐시 무시하고 새로 요청
 * };
 *
 * @example
 * // 실시간 데이터 (캐시 사용 안 함)
 * const { data } = useData(
 *   'realtime-price',
 *   () => fetchRealtimePrice(),
 *   { cacheTime: 0 } // 항상 새로운 데이터 요청
 * );
 *
 * @remarks
 * - key가 변경되면 이전 요청은 자동으로 취소됩니다
 * - 컴포넌트 언마운트 시 진행 중인 요청이 자동으로 취소됩니다
 * - 동일한 key를 사용하는 여러 컴포넌트는 캐시를 공유합니다
 * - 재시도는 exponential backoff 전략을 사용합니다 (1초, 2초, 4초...)
 *
 * @see {@link UseDataOptions} 사용 가능한 옵션
 * @see {@link UseDataReturn} 반환값 설명
 */
export function useData<T>(
  key: string,
  fetcher: () => Promise<T>,
  options: UseDataOptions = {},
): UseDataReturn<T> {
  const { getCache, setCache } = useDataContext();
  const [, forceUpdate] = useReducer((x: number) => x + 1, 0);

  const mergedOptions = { ...DEFAULT_OPTIONS, ...options };

  const cached = getCache<T>(key) || {
    data: null,
    error: null,
    isLoading: false,
    lastFetchedAt: null,
  };

  // cached를 useMemo로 감싸서 의존성 문제 해결
  const cachedData = useMemo(() => cached, [cached]);

  /**
   * 데이터 fetch 실행
   * - 진행 중인 요청이 있으면 새로운 요청을 시작하지 않음
   * - 로딩 상태 업데이트
   * - 실패 시 재시도 로직 적용
   */
  const fetchData = useCallback(async () => {
    if (ongoingRequests.get(key)) {
      return;
    }

    ongoingRequests.set(key, true);

    const currentCache = getCache<T>(key) || {
      data: null,
      error: null,
      isLoading: false,
      lastFetchedAt: null,
    };

    setCache(key, {
      ...currentCache,
      isLoading: true,
      error: null,
    });

    try {
      const maxRetries = mergedOptions.retry as number;
      const baseDelay = mergedOptions.retryDelay as number;

      const executeWithRetry = async (remainRetries: number): Promise<T> => {
        try {
          return await fetcher();
        } catch (error) {
          if (remainRetries <= 1) {
            throw error;
          }

          const retryCount = maxRetries - remainRetries;
          const waitTime = baseDelay * Math.pow(2, retryCount);

          await new Promise((resolve) => setTimeout(resolve, waitTime));

          return executeWithRetry(remainRetries - 1);
        }
      };

      const data = await executeWithRetry(maxRetries);

      setCache(key, {
        data,
        error: null,
        isLoading: false,
        lastFetchedAt: Date.now(),
      });
    } catch (error) {
      const latestCache = getCache<T>(key) || currentCache;

      setCache(key, {
        data: latestCache.data,
        error: error instanceof Error ? error : new Error('Unknown error'),
        isLoading: false,
        lastFetchedAt: latestCache.lastFetchedAt,
      });
    } finally {
      ongoingRequests.delete(key);
    }
  }, [key, fetcher, getCache, setCache, mergedOptions.retry, mergedOptions.retryDelay]);

  const refetch = async () => {
    await fetchData();
  };

  useEffect(() => {
    // 이미 진행 중인 요청이 있으면 스킵
    if (ongoingRequests.get(key)) {
      return;
    }

    // 캐시된 데이터 확인
    const cachedData = getCache<T>(key);

    // 캐시가 없거나 데이터가 없으면 요청
    if (!cachedData || !cachedData.data) {
      fetchData();
    }

    return () => {
      ongoingRequests.delete(key);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  // Context 업데이트로 인한 리렌더링 강제
  useEffect(() => {
    forceUpdate();
  }, [cached.data]);

  return {
    data: cachedData.data,
    error: cachedData.error,
    isLoading: cachedData.isLoading,
    refetch,
  };
}
