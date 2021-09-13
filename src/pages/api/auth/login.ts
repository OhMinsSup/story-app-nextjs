import { NextApiRequest, NextApiResponse } from 'next';
import omit from 'lodash-es/omit';
import prisma from '@libs/prisma';
import { generateToken } from 'src/server/token';

type Body = {
  walletAddress: string;
  signature: string[] | string;
  timestamp: number;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const body: Body = req.body ?? {};

    console.log('body', body);

    const exists = await prisma.user.findFirst({
      where: {
        address: body.walletAddress,
      },
      include: {
        profile: true,
      },
    });

    if (!exists) {
      return res.status(404).json({
        ok: false,
        resultCode: 2001,
        message: '존재하지 않는 유저 정보입니다.',
        payload: null,
      });
    }

    const accessToken = await generateToken(
      {
        userId: exists.id,
        email: exists.email,
        address: exists.address,
      },
      {
        subject: 'access_token',
        expiresIn: '30d',
      },
    );

    return res.status(200).json({
      ok: true,
      resultCode: 0,
      message: null,
      payload: {
        accessToken,
        email: exists.email,
        profile: omit(exists.profile, [
          'userId',
          'createdAt',
          'updatedAt',
          'gender',
        ]),
      },
    });
  } catch (error) {
    throw error;
  }
};

export default handler;
