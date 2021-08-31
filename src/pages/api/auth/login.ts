import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@libs/prisma';

function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const body = req.body ?? {};

    return res.json(true);
  } catch (error) {
    console.error(error);

    res.status(500).json({ data: null, error: 'An unexpected error ocurred' });
  }
}

export default handler;
