import React, { Component } from 'react';
import { IS_DEPLOY_GROUP_PROD, IS_PROD } from '@constants/env';

import NetworkErrorScreen from './components/NetworkErrorScreen';
import CrashErrorScreen from './components/CrashErrorScreen';

class ErrorBoundary extends Component<Record<string, any>> {
  state = {
    hasError: false,
    networkError: false,
  };

  static getDerivedStateFromError(error: Error) {
    if (error && error.message === 'Network Error') {
      return {
        networkError: true,
      };
    }

    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.log(error);
  }

  handleClearError = () => {
    this.setState({ hasError: false, networkError: false });
  };

  render() {
    if (this.state.networkError) {
      return <NetworkErrorScreen handleClearError={this.handleClearError} />;
    }

    if (this.state.hasError) {
      return <CrashErrorScreen handleClearError={this.handleClearError} />;
    }

    return <>{this.props.children}</>;
  }
}

export default ErrorBoundary;
