import { NextApiRequest, NextApiResponse } from 'next';
import omit from 'lodash-es/omit';
import prisma from '@libs/prisma';
import { generateToken } from 'src/server/token';

type Body = {
  walletAddress: string;
  signature: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const body: Body = req.body ?? {};

    // 유저가 존재하는지 확인
    const exists = await prisma.user.findFirst({
      where: {
        address: body.walletAddress,
      },
      include: {
        profile: true,
        session: true,
      },
    });

    if (!exists) {
      // 서명 스키마를 먼저 생성하고 이후에 사용자를 생성한다.
      const signature = await prisma.signature.create({
        data: {
          signature: body.signature,
        },
      });

      // 존재하지 않는 경우 서명 스키마의 아이디값을 넘겨준다.
      return res.status(404).json({
        ok: false,
        resultCode: 2001,
        message: '존재하지 않는 유저 정보입니다.',
        payload: {
          signatureId: signature.id,
          signature: signature.signature,
        },
      });
    }

    // 세션이 존재하고 이미 존재하는 세션하고 새로운 세샨이 다르면 업데이트
    if (exists.session && exists.session?.signature !== body.signature) {
      await prisma.signature.update({
        data: {
          signature: body.signature,
        },
        where: {
          id: exists.session.id,
        },
      });
    }

    // 액세스 토큰을 생성한다.
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
