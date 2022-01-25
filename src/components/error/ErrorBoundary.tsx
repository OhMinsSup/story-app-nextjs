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
    console.log('[ErrorBoundary] getDerivedStateFromError =======>', error);
    if (error && error.message === 'Network Error') {
      return {
        networkError: true,
      };
    }

    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.log(
      '[ErrorBoundary] componentDidCatch(errorInfo) =======>',
      errorInfo,
    );
    console.log('[ErrorBoundary] componentDidCatch(error) =======>', error);
    if (IS_PROD && IS_DEPLOY_GROUP_PROD) {
      Sentry.captureException(error);
    }
  }

  render() {
    if (this.state.networkError) {
      return <NetworkErrorScreen />;
    }

    if (this.state.hasError) {
      return <CrashErrorScreen />;
    }

    return <>{this.props.children}</>;
  }
}

export default ErrorBoundary;
