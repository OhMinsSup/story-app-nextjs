import { parse, stringify as stringifyCookie } from './utils';

export type CookieOptions = {
  /**
   * 클라이언트 측 JavaScript가 쿠키를 읽을 수 없도록](https://owasp.org/www-community/HttpOnly)
   * 쿠키를 보호할지 여부.
   */
  httpOnly?: boolean;
  /**
   * 브라우저가 HTTPS를 통해서만 쿠키를 전송하도록 쿠키를 보호할지 여부입니다.
   * 브라우저 [localhost의 보안 쿠키와 작동하지 않음](https://owasp.org/www-community/controls/SecureCookieAttribute).
   */
  secure?: boolean;
  /**
   * 쿠키가 자사로 제한되어야 함을 선언합니다.
   * [동일 사이트](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite)
   */
  sameSite?: 'Lax' | 'Strict' | 'None';
  /**
   *  쿠키가 다음과 같은 경우에만 서버로 보내야 함을 브라우저에 알립니다.
   *  [정의된 경로](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#path_attribute)
   */
  path?: string;
  /**
   * [쿠키가 만료되는 날짜](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#define_the_lifetime_of_a_cookie).
   * 날짜가 과거인 경우 브라우저는 쿠키를 제거합니다.
   */
  expires?: Date;
  /**
   * [특정 도메인](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#domain_attribute)에서만 사용되도록 쿠키를 보호합니다
   */
  domain?: string;
  /**
   * [쿠키가 만료될 때까지의 시간(초)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie#max-agenumber).
   * `maxAge`는 둘 다 정의된 경우 `expires`보다 우선합니다.
   */
  maxAge?: number;
};

export class Cookie {
  name: string;
  options?: CookieOptions;
  data: Record<string, any>;

  constructor(name: string, options: CookieOptions = {}) {
    this.options = options;
    this.options = {
      ...this.options,
      expires:
        // maxAge takes precedence
        typeof options.maxAge !== 'undefined'
          ? new Date(Date.now() + options.maxAge * 1000)
          : options.expires
          ? options.expires
          : new Date(Date.now() + 604_800_000), // default one week
    };
    this.name = name;
    this.data = {};
  }

  parse(cookie: string) {
    try {
      const data = parse(cookie)[this.name];
      this.data[this.name] = data;
    } catch (e) {
      // failure to parse cookie
    }
    return this.data[this.name];
  }

  set(key: string, value: string) {
    this.data[key] = value;
  }

  setAll(data: Record<string, string>) {
    this.data = data;
  }

  serialize(): string {
    return stringifyCookie(this.name, JSON.stringify(this.data), this.options);
  }

  destroy(): string {
    this.data = {};
    return stringifyCookie(this.name, '', {
      ...this.options,
      expires: new Date(0),
    });
  }

  get expires(): number | undefined {
    return this.options?.expires?.getTime();
  }

  setSessionid(sid: string) {
    return this.set('sid', sid);
  }

  getSessionId(request: Request): string | null {
    const cookieValue = request.headers.get('cookie');

    if (cookieValue) {
      return this.parse(cookieValue).sid;
    }

    return null;
  }
}
