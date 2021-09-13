import { NextApiRequest, NextApiResponse } from 'next';
import omit from 'lodash-es/omit';
import prisma from '@libs/prisma';
import { generateToken } from 'src/server/token';

type Body = {
  profileUrl?: string;
  nickname: string;
  email: string;
  walletAddress: string;
  gender: string;
  signature: string[] | string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const body: Body = req.body ?? {};

    const exists = await prisma.user.findFirst({
      where: {
        AND: [
          {
            email: body.email,
          },
          {
            address: body.walletAddress,
          },
        ],
      },
    });

    if (exists) {
      return res.status(200).json({
        ok: true,
        resultCode: 2002,
        message:
          exists.email === body.email
            ? '이미 사용중인 이메일입니다. 다시 입려해주세요.'
            : '이미 등록된 주소입니다. 다시 입력해주세요.',
        payload: exists.email === body.email ? 'email' : 'address',
      });
    }

    const user = await prisma.user.create({
      data: {
        email: body.email,
        address: body.walletAddress,
      },
    });

    const avatar = `https://ui-avatars.com/api/?format=svg&background=random&name=${body.nickname}`;
    const profile = await prisma.profile.create({
      data: {
        userId: user.id,
        nickname: body.nickname,
        gender: body.gender,
        ...(body.profileUrl
          ? {
              profileUrl: body.profileUrl,
              avatarSvg: '',
              defaultProfile: false,
            }
          : {
              avatarSvg: avatar,
            }),
      },
    });

    const accessToken = await generateToken(
      {
        userId: user.id,
        email: user.email,
        address: user.address,
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
        email: user.email,
        profile: omit(profile, ['userId', 'createdAt', 'updatedAt', 'gender']),
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default handler;
