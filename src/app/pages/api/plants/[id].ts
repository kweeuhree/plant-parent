import { NextApiRequest, NextApiResponse } from "next";
import connectToDb from '../../../lib/connectToDb';
import Plant from "../../../models/Plant";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const {
    query: { id },
    method,
  } = req;

  await connectToDb();

  switch (method) {
    case "GET" /* Get a model by its ID */:
      try {
        const plant = await Plant.findById(id);
        if (!plant) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: plant });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "PUT" /* Edit a model by its ID */:
      try {
        const plant = await Plant.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!plant) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: plant });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "DELETE" /* Delete a model by its ID */:
      try {
        const deletedPlant = await Plant.deleteOne({ _id: id });
        if (!deletedPlant) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}