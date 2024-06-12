import React, { Component, ReactNode } from "react";
import Fallback from "./Fallback";

interface Props {
  children: ReactNode;
  onReset: () => void;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  handleReset = () => {
    this.setState({ hasError: false });
    this.props.onReset();
  };

  render() {
    if (this.state.hasError) {
      return <Fallback onClick={this.handleReset} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
