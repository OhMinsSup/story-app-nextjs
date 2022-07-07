import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('req', req.headers.cookie);
  console.log('res', res.getHeaderNames());
  //   console.log('res', res);
  // Get data from your database
  res.status(200).json(true);
}
