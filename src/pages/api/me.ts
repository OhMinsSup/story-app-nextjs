import type { NextApiRequest, NextApiResponse } from 'next';
import { Cookie } from '@libs/foundation/cookie';

export let data = {
  test: '1312312',
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  data = {
    test: 'hahaahah',
  };
  //   console.log('res', res);
  // Get data from your database
  res.status(200).json(true);
}
