import React from 'react';
import { showToast } from '../../../utils/toast/showToast';

type Props = { children: React.ReactNode };
type State = { hasError: boolean };

class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      showToast('문제가 발생했습니다. 새로고침 해주세요.', 'error');
      return null;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
