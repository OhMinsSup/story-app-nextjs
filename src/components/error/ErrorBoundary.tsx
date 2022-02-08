import React, { Component } from 'react';
import * as Sentry from '@sentry/browser';
import { IS_DEPLOY_GROUP_PROD, IS_PROD } from '@constants/env';
import NetworkErrorScreen from './NetworkErrorScreen';
import CrashErrorScreen from './CrashErrorScreen';

class ErrorBoundary extends Component {
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
    if (IS_PROD && IS_DEPLOY_GROUP_PROD) {
      Sentry.captureException(error);
    }
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
