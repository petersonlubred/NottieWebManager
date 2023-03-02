import React from 'react';

import ErrorFallback from '../ErrorFallback';

class ErrorBoundary extends React.Component<Record<string, any>, { hasError: boolean; error: string }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: '' };
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error: error.message };
  }

  componentDidCatch() {
    // You can also log the error to an error reporting service
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <ErrorFallback message={this.state.error} />;
    }

    return <>{this.props.children}</>;
  }
}

export default ErrorBoundary;
