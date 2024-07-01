import { NextApiRequest, NextApiResponse } from 'next';
import connectToDb from '../../lib/connectToDb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectToDb();
    res.status(200).json({ message: 'Database connected successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Database connection failed' });
  }
}
