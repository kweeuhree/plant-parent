import { NextRequest, NextResponse } from 'next/server';
import { connectToDb } from '../../../(lib)/connectToDb';
import Plant from '../../../(models)/Plant';

// Handle GET requests
export async function GET(req: NextRequest) {
  try {
    await connectToDb();
    const plants = await Plant.find({});
    return NextResponse.json({ success: true, data: plants });
  } catch (error) {
    console.error('Error fetching plants:', error);
    return NextResponse.json({ success: false, message: 'Error fetching plants' }, { status: 400 });
  }
}

// Handle POST requests
export async function POST(req: NextRequest) {
  try {
    await connectToDb();
    const data = await req.json(); // Extract JSON body from the request
    console.log('Received POST request with body:', data);
    const plant = await Plant.create(data); // create a new model in the database
    console.log('Plant created:', plant);
    return NextResponse.json({ success: true, data: plant }, { status: 201 });
  } catch (error) {
    console.error('Error creating plant:', error);
    return NextResponse.json({ success: false, message: 'Error creating plant', error: error }, { status: 400 });
  }
}
