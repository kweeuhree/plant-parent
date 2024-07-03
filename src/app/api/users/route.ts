import { NextRequest, NextResponse } from 'next/server';
import { connectToDb } from '../../(lib)/connectToDb';
import User from '../../(models)/User';

// Handle GET requests
export async function GET(req: NextRequest) {
  try {
    await connectToDb();
    const users = await User.find({});
    return NextResponse.json({ success: true, data: users });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ success: false, message: 'Error fetching users' }, { status: 400 });
  }
}

// Handle POST requests
export async function POST(req: NextRequest) {
  try {
    await connectToDb();
    const data = await req.json(); // Extract JSON body from the request
    console.log('Received POST request with body:', data);
    const user = await User.create(data); // create a new model in the database
    console.log('User created:', user);
    return NextResponse.json({ success: true, data: user }, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ success: false, message: 'Error creating user', error: error.message }, { status: 400 });
  }
}
