import ky, { NormalizedOptions } from 'ky';

export const client = ky.create({
  prefixUrl: 'http://localhost:3000/api',
  hooks: {
    beforeRequest: [
      (request: Request, options: NormalizedOptions) => {
        if (typeof window !== 'undefined') {
          const method = request.method?.toUpperCase();
          console.log(
            `%c📦 API 요청 송신  주소:${request.url} 유형:${method}`,
            'color: #E19A56;',
            request.body,
          );
        }
      },
    ],
    afterResponse: [
      (request: Request, options: NormalizedOptions, response: Response) => {
        if (typeof window !== 'undefined') {
          const method = response.headers.get('method')?.toUpperCase();
          console.log(
            `%c📫 API 응답 수신  주소:${response.url} 유형:${method}`,
            'color: #31B4D9;',
            response,
          );
        }
      },
    ],
  },
});
