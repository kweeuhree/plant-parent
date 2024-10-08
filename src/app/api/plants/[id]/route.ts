import { NextRequest, NextResponse } from 'next/server';
import { connectToDb } from '../../../(lib)/connectToDb';
import Plant from '../../../(models)/Plant';

// Handle GET specific user requests
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id 
  console.log(id);

  const plant = await Plant.findById(id);
  if (!plant) {
    return NextResponse.json({ success: false, message: 'User not found'}, { status: 400});
  }

  return NextResponse.json({ success: true, data: plant}, { status: 200});
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
    const plant = await Plant.findByIdAndUpdate(id, reqBody, {
      new: true
      // runValidators: true,
    });
    if (!plant) {
      return NextResponse.json({ success: false, message: 'Plant with this id not found'}, { status: 400});
      }

    return NextResponse.json({ success: true, data: plant}, { status: 200});

    } catch (error) {
    return NextResponse.json({ success: false, message: error}, { status: 400});
  }
}

// Handle DELETE user requests
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id 
  console.log(id);

  try {
    const deletedPlant = await Plant.deleteOne({ _id: id });
    if (!deletedPlant) {
      return NextResponse.json({ success: false}, { status: 400});
    }
    return NextResponse.json({ success: true, message: 'Plant deleted'}, { status: 200});

  } catch (error) {
    return NextResponse.json({ success: false}, { status: 400});
  }
}
