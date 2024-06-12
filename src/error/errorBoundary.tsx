import ErrorFallback from "@/error/ErrorFallback";
import { Component, PropsWithChildren } from "react";

export interface ErrorProps {
  message: string;
  resetError: () => void;
}

interface ErrorBoundaryProps {
  Fallback: Element;
  onReset?: (error: Error) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

const initialState: State = {
  hasError: false,
  error: null,
};

class ErrorBoundary extends Component<PropsWithChildren<ErrorBoundaryProps>, State> {
  state: State = initialState;

  resetErrorBoundary = () => {
    this.props.onReset?.(this.state.error!);
    this.setState(initialState);
  };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    const { Fallback } = this.props;
    const { error } = this.state;

    if (error) {
      return <ErrorFallback />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
