import { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';
import cloudinary from 'cloudinary';

// db
import prisma from '@libs/prisma';

// server  middleware
import { runMiddleware } from 'src/server/middlewares';
import { AccessTokenData, decodeToken } from 'src/server/token';
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
} from '@constants/env';

// Initializing the cors middleware
const cors = Cors({
  methods: ['GET', 'HEAD', 'OPTIONS'],
});

cloudinary.v2.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
  secure: true,
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await runMiddleware(req, res, cors);

    let accessToken: string | null = null;
    const { authorization } = req.headers;

    if (authorization) {
      accessToken = authorization.split(' ')[1];
    }

    if (!accessToken) {
      return res.status(401).json({
        ok: false,
        resultCode: 401,
        message: 'token이 없습니다.',
        payload: null,
      });
    }

    const tokenData = await decodeToken<AccessTokenData>(accessToken);
    const diff = tokenData.exp * 1000 - new Date().getTime();
    if (diff < 1000 * 60 * 7) {
      console.log('token 만료');
    }

    const { api_secret } = cloudinary.v2.config();
    if (!api_secret) {
      return res.status(401).json({
        ok: false,
        resultCode: 401,
        message: 'secret key가 없습니다.',
        payload: null,
      });
    }

    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = cloudinary.v2.utils.api_sign_request(
      {
        timestamp,
      },
      api_secret,
    );

    return res.status(200).json({
      ok: true,
      resultCode: 0,
      message: null,
      payload: {
        signature,
      },
    });
  } catch (error) {
    throw error;
  }
};

export default handler;
