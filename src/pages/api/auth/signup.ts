import { Prisma } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

type Body = {};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const body: Body = req.body ?? {};

    console.log('body', body);
  } catch (error) {
    console.error(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (error.code === 'P2002') {
        console.log(
          'There is a unique constraint violation, a new user cannot be created with this email',
        );
      }
    }
    throw error;
  }
};

export default handler;
