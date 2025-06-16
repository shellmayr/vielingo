import { NextRequest, NextResponse } from 'next/server';
import { exercises } from '@/data/exercises';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    if (!id) {
      return NextResponse.json(
        { error: 'Exercise ID is required' },
        { status: 400 }
      );
    }

    const exercise = exercises.find(ex => ex.id === id);

    if (!exercise) {
      return NextResponse.json(
        { error: 'Exercise not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      exercise,
      metadata: {
        totalExercises: exercises.length,
        exerciseIndex: exercises.findIndex(ex => ex.id === id) + 1
      }
    });

  } catch (error) {
    console.error('Error fetching exercise:', error);
    return NextResponse.json(
      { error: 'Failed to fetch exercise' },
      { status: 500 }
    );
  }
} 