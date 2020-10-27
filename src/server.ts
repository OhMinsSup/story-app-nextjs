/* eslint-disable import/no-extraneous-dependencies */
import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import * as sapper from '@sapper/server';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'dev';

polka() // You can also use Express
  .use(cookieParser())
  .use(
    session({
      secret: 'velog',
      resave: false,
      saveUninitialized: true,
    })
  )
  .use(
    compression({ threshold: 0 }),
    sirv('static', { dev }),
    sapper.middleware({
      session: (req: any) => {
        const { cookies } = req;
        if (!cookies.refresh_token) {
          return {
            token: {},
            user: {},
          };
        }

        if (!cookies.access_token && cookies.refresh_token) {
          return {
            token: {
              access_token: null,
              refresh_token: cookies.refresh_token,
            },
            user: {},
          };
        }

        return {
          token: {
            access_token: cookies.access_token,
            refresh_token: cookies.refresh_token,
          },
          user: {},
        };
      },
    })
  )
  .listen(PORT, (err) => {
    if (err) console.log('error', err);
  });
