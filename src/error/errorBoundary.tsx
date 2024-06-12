import React, { ReactNode, ReactElement } from "react";

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage?: string;
  resetError: () => void;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactElement;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
    errorMessage: undefined,
    resetError: () => {},
  };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, errorMessage: error.message, resetError: () => {} };
  }

  componentDidCatch(error: Error) {
    this.setState({ errorMessage: error.message });
  }

  render() {
    const { fallback } = this.props;
    const { hasError, errorMessage, resetError } = this.state;

    if (hasError) {
      return React.cloneElement(fallback, { message: errorMessage, resetError: resetError });
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
