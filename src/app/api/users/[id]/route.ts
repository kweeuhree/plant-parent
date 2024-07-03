import { NextRequest, NextResponse } from 'next/server';
import { connectToDb } from '../../../(lib)/connectToDb';
import User from '../../../(models)/User';

// Handle GET specific user requests
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id 
  console.log(id);

  const user = await User.findById(id);
  if (!user) {
    return NextResponse.json({ success: false, message: 'User not found'}, { status: 400});
  }

  return NextResponse.json({ success: true, data: user}, { status: 200});
}

// Handle PUT user requests
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id; 

  const reqBody = await request.json();
  console.log(reqBody, 'req body');

  try {
    const user = await User.findByIdAndUpdate(id, reqBody, {
      new: true
      // runValidators: true,
    });
    if (!User) {
      return NextResponse.json({ success: false, message: 'User with this id not found'}, { status: 400});
      }

    return NextResponse.json({ success: true, data: user}, { status: 200});

    } catch (error) {
    return NextResponse.json({ success: false, message: error}, { status: 400});
  }
}

// Handle DELETE user requests
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id // 'a', 'b', or 'c'
  console.log(id);

  try {
    const deletedUser = await User.deleteOne({ _id: id });
    if (!deletedUser) {
      return NextResponse.json({ success: false}, { status: 400});
    }
    return NextResponse.json({ success: true, message: 'User deleted'}, { status: 200});

  } catch (error) {
    return NextResponse.json({ success: false}, { status: 400});
  }
}
