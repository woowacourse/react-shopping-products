import { setupWorker } from 'msw/browser';
import { productHandlers } from './handlers/product';
import { cartHandlers } from './handlers/cart';

// 모든 핸들러를 하나의 배열로 결합
const handlers = [...productHandlers, ...cartHandlers];

// MSW 워커 설정
export const worker = setupWorker(...handlers);

export async function initMocks() {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.NODE_ENV === undefined
  ) {
    try {
      // 서비스 워커 등록 옵션
      await worker.start({
        onUnhandledRequest: 'bypass',
        serviceWorker: {
          url: `${window.location.origin}/mockServiceWorker.js`,
          options: {
            scope: '/',
          },
        },
      });
      console.log('[MSW] Mock Service Worker 활성화됨');
    } catch (error) {
      console.error('[MSW] Service Worker 등록 실패:', error);

      // 백업 핸들러: 서비스 워커가 실패할 경우 알림만 표시
      console.log(
        '[MSW] 서비스 워커 등록에 실패했습니다. MSW가 작동하지 않습니다.'
      );
    }
  }
  return Promise.resolve();
}
