import * as Styled from './main.styled';

import App from './App.tsx';
import ReactDOM from 'react-dom/client';
import ToastProvider from '@components/common/Toast/provider/ToastProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Styled.MainContainer>
    <ToastProvider>
      <App />
    </ToastProvider>
  </Styled.MainContainer>
);
