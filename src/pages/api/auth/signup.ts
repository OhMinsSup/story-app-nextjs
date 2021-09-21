import { NextApiRequest, NextApiResponse } from 'next';
import omit from 'lodash-es/omit';
import prisma from '@libs/prisma';
import { generateToken } from 'src/server/token';
import { GenderType } from 'types/story-api';

type Body = {
  profileUrl: string;
  nickname: string;
  email: string;
  walletAddress: string;
  gender: GenderType;
  signature: string;
  defaultProfile: boolean;
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

    // 유저 생성
    const user = await prisma.user.create({
      data: {
        email: body.email,
        address: body.walletAddress,
      },
    });

    // 프로필 생성
    const profile = await prisma.profile.create({
      data: {
        userId: user.id,
        nickname: body.nickname,
        gender: body.gender,
        profileUrl: body.defaultProfile ? '' : body.profileUrl,
        avatarSvg: body.defaultProfile ? body.profileUrl : '',
        defaultProfile: body.defaultProfile,
      },
    });

    // 세션 정보 생성
    await prisma.session.create({
      data: {
        userId: user.id,
        signature: body.signature,
      },
    });

    // 액세스 토큰 생성
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
