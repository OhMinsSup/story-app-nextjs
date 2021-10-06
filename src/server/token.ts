import jwt, { SignOptions } from 'jsonwebtoken';

const SECRET_KEY = 's8h@*oqc_brsha+rc@mvp3(glhp$7ad3ep#l$w3quv!3dio&+n';

type TokenData = {
  iat: number;
  exp: number;
  sub: string;
  iss: string;
};

export interface AccessTokenData extends TokenData {
  userId: number;
  email: string;
  address: string;
}

export const generateToken = (
  payload: any,
  options?: SignOptions,
): Promise<string> => {
  const jwtOptions: SignOptions = {
    issuer: 'test.io',
    expiresIn: '7d',
    ...options,
  };

  if (!jwtOptions.expiresIn) {
    // removes expiresIn when expiresIn is given as undefined
    delete jwtOptions.expiresIn;
  }

  return new Promise<string>((resolve, reject) => {
    if (!SECRET_KEY) return;
    jwt.sign(payload, SECRET_KEY, jwtOptions, (err: any, token?: string) => {
      if (err) reject(err);
      resolve(token ?? '');
    });
  });
};

export const decodeToken = <T = any>(token: string): Promise<T> => {
  return new Promise((resolve, reject) => {
    if (!SECRET_KEY) return;
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) reject(err);
      resolve(decoded as any);
    });
  });
};
