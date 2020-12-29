/* eslint-disable import/no-extraneous-dependencies */
import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import bodyParser from 'body-parser';
import sessionFileStore from 'session-file-store';
import * as sapper from '@sapper/server';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'dev';

// 세션 데이터를 저장하고 만료 된 세션을 제거하는 작업
const FileStore = sessionFileStore(session);

polka() // You can also use Express
  //  json을 구문 분석하는 데 이것을 사용할 것입니다.
  //  polka (익스프레스 아님)로 설정된 Sapper 템플릿을 사용하고 있으므로 이것을 필요
  .use(bodyParser.json())
  // cookie값을 가져오기때문에
  .use(cookieParser())
  .use(
    // 특정 사용자를 추적하기 위해 쿠키를 만들고, 해당 쿠키를 저장소 (캐시)의 레코드에 매핑하고,
    // 참조 할 나머지 경로에 대한 요청에 해당 세션을 연결하는 작업을 처리
    session({
      secret: 'velog-fornt',
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 31536000,
      },
      store: new FileStore({
        path: 'tmp/.session',
      }),
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
            token: null,
            user: null,
          };
        }

        if (!cookies.access_token && cookies.refresh_token) {
          return {
            token: {
              access_token: null,
              refresh_token: cookies.refresh_token,
            },
            user: null,
          };
        }

        return {
          token: {
            access_token: cookies.access_token,
            refresh_token: cookies.refresh_token,
          },
          user: null,
        };
      },
    })
  )
  .listen(PORT, (err: any) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.error('error', err);
    }
  });
