import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDb } from '../(lib)/connectToDb';
import User from '../(models)/User';

// Ensure the database connection is established
connectToDb();

// Handler for GET request
export async function getHandler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  console.log(req.query.id);

  // Ensure id is present in the query
  if (!id) {
    return res.status(400).json({ success: false, message: 'User ID is required' });
  }

  try {
    await connectToDb();
    console.log(`Fetching user with ID: ${id}`);
    
    const user = await User.findById(id);
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}

// Handler for PUT request
export async function putHandler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const data = await req.body;

  try {
    await connectToDb();
    console.log(`Updating user with ID: ${id}`, data);
    
    const user = await User.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(400).json({ success: false, error: error.message });
  }
}

// Handler for DELETE request
export async function deleteHandler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  try {
    await connectToDb();
    console.log(`Deleting user with ID: ${id}`);
    
    const deletedUser = await User.findByIdAndDelete(id);
    
    if (!deletedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    console.log(`Deleted user: ${deletedUser}`);
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(400).json({ success: false, error: error.message });
  }
}
