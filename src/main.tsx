import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

// MSW 초기화
async function startApp() {
  // 개발 환경에서만 MSW 실행
  if (process.env.NODE_ENV === 'development') {
    console.log('[MSW] 개발 모드에서 MSW 로드 중...');

    try {
      // 서비스 워커 스크립트가 존재하는지 확인
      try {
        const resp = await fetch('/mockServiceWorker.js');
        if (resp.ok) {
          console.log('[MSW] 서비스 워커 스크립트가 존재합니다!');
        } else {
          console.error(
            '[MSW] 서비스 워커 스크립트를 찾을 수 없습니다:',
            resp.status
          );
        }
      } catch (error) {
        console.error('[MSW] 서비스 워커 스크립트 확인 중 오류:', error);
      }

      // worker 로드 및 시작
      const { worker } = await import('./mocks');

      console.log('[MSW] 서비스 워커 등록 시도...');
      await worker
        .start({
          onUnhandledRequest: 'bypass',
          // 명시적인 경로와 스코프 설정
          serviceWorker: {
            url: '/mockServiceWorker.js',
            options: {
              scope: '/',
            },
          },
        })
        .catch((error) => {
          console.error('[MSW] 서비스 워커 등록 실패:', error);
          throw error;
        });

      console.log('[MSW] Mock Service Worker 활성화됨');
    } catch (error) {
      console.error('[MSW] 초기화 실패:', error);
    }
  }

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

startApp();
