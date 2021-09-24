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

    // 현재 회원가입을 할려고 하는 signature 정보를 가져온다.
    const currentSignature = await prisma.signature.findFirst({
      where: {
        AND: [
          {
            isVerified: false,
          },
          {
            signature: body.signature,
          },
        ],
      },
    });

    // 해당 정보가 존재하지 않으면 에러를 반환한다.
    if (!currentSignature) {
      return res.status(404).json({
        ok: false,
        resultCode: 2001,
        message: '유효하지 않은 signature 입니다.',
        payload: null,
      });
    }

    // 회원가입 signature 정보를 업데이트 한다.
    await prisma.signature.update({
      where: {
        id: currentSignature.id,
      },
      data: {
        isVerified: true,
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
