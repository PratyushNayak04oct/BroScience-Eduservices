import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('web-data');
    const collection = db.collection('Courses');
    
    const courses = await collection.find({}).toArray();
    
    return NextResponse.json({ 
      success: true, 
      data: courses 
    });
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch courses' 
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db('web-data');
    const collection = db.collection('Courses');
    
    const courseData = await request.json();
    
    const result = await collection.insertOne({
      ...courseData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    return NextResponse.json({ 
      success: true, 
      data: result 
    });
  } catch (error) {
    console.error('Error creating course:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create course' 
      },
      { status: 500 }
    );
  }
}