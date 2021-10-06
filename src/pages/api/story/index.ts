import { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';
import isEmpty from 'lodash-es/isEmpty';

// db
import prisma from '@libs/prisma';

// server  middleware
import { runMiddleware } from 'src/server/middlewares';
import { AccessTokenData, decodeToken } from 'src/server/token';

// Initializing the cors middleware
const cors = Cors({
  methods: ['POST', 'HEAD', 'OPTIONS'],
});

type Body = {
  name: string;
  description: string;
  mediaId: number;
  backgroundColor?: string;
  externalUrl?: string;
};

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

    const body: Body = req.body ?? {};

    if (isEmpty(body)) {
      return res.status(404).json({
        ok: false,
        resultCode: 404,
        message: 'body값이 없습니다.',
        payload: null,
      });
    }

    const existsUser = await prisma.user.findFirst({
      where: {
        id: tokenData.userId,
      },
    });

    if (!existsUser) {
      return res.status(404).json({
        ok: false,
        resultCode: 404,
        message: '사용자가 존재하지 않습니다.',
        payload: null,
      });
    }

    // 유저 생성
    const story = await prisma.story.create({
      data: {
        mediaId: body.mediaId,
        userId: existsUser.id,
        name: body.name,
        description: body.description,
        externalUrl: body.externalUrl,
        backgroundColor: body.backgroundColor,
      },
      include: {
        media: true,
        user: true,
      },
    });

    return res.status(200).json({
      ok: true,
      resultCode: 0,
      message: null,
      payload: story,
    });
  } catch (error) {
    throw error;
  }
};

export default handler;
