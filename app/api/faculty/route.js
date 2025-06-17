import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('web-data');
    const collection = db.collection('Faculty');
    
    const faculty = await collection.find({}).toArray();
    
    return NextResponse.json({ 
      success: true, 
      data: faculty 
    });
  } catch (error) {
    console.error('Error fetching faculty:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch faculty' 
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db('web-data');
    const collection = db.collection('Faculty');
    
    const facultyData = await request.json();
    
    const result = await collection.insertOne({
      ...facultyData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    return NextResponse.json({ 
      success: true, 
      data: result 
    });
  } catch (error) {
    console.error('Error creating faculty:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create faculty' 
      },
      { status: 500 }
    );
  }
}