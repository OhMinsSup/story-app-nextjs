import np from 'nprogress';
import Document from 'next/document';
import { Router } from 'next/router';
import { createGetInitialProps } from '@mantine/next';

const start = () => np.start();

const done = () => np.done();

Router.events.on('routeChangeStart', start);
Router.events.on('routeChangeComplete', done);
Router.events.on('routeChangeError', done);

const getInitialProps = createGetInitialProps();

export default class _Document extends Document {
  static getInitialProps = getInitialProps;
}
