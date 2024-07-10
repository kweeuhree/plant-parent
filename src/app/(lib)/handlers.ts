import { NextRequest, NextResponse } from 'next/server';
import { connectToDb } from './connectToDb';

export async function GET(req: NextRequest) {
  try {
    console.log('attempting get request');
    await connectToDb();
    return NextResponse.json({ message: 'GET request handled successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDb();
    // Your logic for handling POST requests goes here
    return NextResponse.json({ message: 'POST request handled successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectToDb();
    // Your logic for handling PUT requests goes here
    return NextResponse.json({ message: 'PUT request handled successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await connectToDb();
    // Your logic for handling DELETE requests goes here
    return NextResponse.json({ message: 'DELETE request handled successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
  }
}
