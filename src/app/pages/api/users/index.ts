import { NextApiRequest, NextApiResponse } from "next";
import connectToDb from '../../../lib/connectToDb';
import User from "../../../models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;

  await connectToDb();

  switch (method) {
    case "GET":
      try {
        const users = await User.find({}); /* find all the data in our database */
        res.status(200).json({ success: true, data: users });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        console.log('Received POST request with body:', req.body);
        const user = await User.create(req.body); /* create a new model in the database */
        console.log('User created:', user);
        res.status(201).json({ success: true, data: user });
      } catch (error) {
        console.error('Error creating user:', error);
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}