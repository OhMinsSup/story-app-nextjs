import 'source-map-support/register';
import 'dotenv';

import express from 'express';
import next from 'next';
import { IS_PROD } from '../src/constants';
import conf from '../next.config';

const PORT = IS_PROD ? 80 : 3000;

async function bootstrap() {
  try {
    const app = express();

    const renderer = next({
      conf,
      dev: !IS_PROD,
    });

    await renderer.prepare();

    const render = renderer.getRequestHandler();

    app.use(express.json());

    app.get('/health', (_req, res) => res.json('ok'));

    app.all('*', (req, res) => render(req, res));

    app.listen(PORT, (err?: any) => {
      if (err) throw err;
      // eslint-disable-next-line no-console
      console.log(
        `🚀 React Server Renderer is running on http://localhost:${PORT}`
      );
    });
  } catch (ex) {
    console.error(ex);
    process.exit(1);
  }
}

bootstrap();
