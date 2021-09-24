import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@libs/prisma';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;
    const userInfo = await prisma.user.findFirst({
      where: { id: Number(id) },
    });

    if (!userInfo) {
      // 존재하지 않는 경우 서명 스키마의 아이디값을 넘겨준다.
      return res.status(404).json({
        ok: false,
        resultCode: 2001,
        message: '존재하지 않는 유저 정보입니다.',
        payload: null,
      });
    }

    // 현재 유저의 signature 정보를 가져온다.
    const currentSignature = await prisma.signature.findFirst({
      where: {
        AND: [
          {
            userId: userInfo.id,
          },
          {
            isVerified: true,
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

    res.status(200).json({
      ok: true,
      resultCode: 0,
      message: null,
      payload: {
        signature: currentSignature?.signature,
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default handler;
