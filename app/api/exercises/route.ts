import { NextRequest, NextResponse } from 'next/server';
import { exercises, Exercise } from '@/data/exercises';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const level = searchParams.get('level') as Exercise['level'] | null;
    const tag = searchParams.get('tag');
    const random = searchParams.get('random');
    const limit = searchParams.get('limit');

    let filteredExercises = exercises;

    // Filter by level if provided
    if (level && ['Beginner', 'Intermediate', 'Advanced'].includes(level)) {
      filteredExercises = filteredExercises.filter(exercise => exercise.level === level);
    }

    // Filter by tag if provided
    if (tag) {
      filteredExercises = filteredExercises.filter(exercise => 
        exercise.tags?.some(t => t.toLowerCase().includes(tag.toLowerCase()))
      );
    }

    // Return random exercise(s) if requested
    if (random === 'true') {
      const randomCount = limit ? Math.min(parseInt(limit), filteredExercises.length) : 1;
      const shuffled = [...filteredExercises].sort(() => 0.5 - Math.random());
      filteredExercises = shuffled.slice(0, randomCount);
    } else if (limit) {
      // Apply limit if specified
      const limitNumber = parseInt(limit);
      if (!isNaN(limitNumber) && limitNumber > 0) {
        filteredExercises = filteredExercises.slice(0, limitNumber);
      }
    }

    return NextResponse.json({
      exercises: filteredExercises,
      total: filteredExercises.length,
      filters: {
        level: level || null,
        tag: tag || null,
        random: random === 'true',
        limit: limit ? parseInt(limit) : null
      }
    });

  } catch (error) {
    console.error('Error fetching exercises:', error);
    return NextResponse.json(
      { error: 'Failed to fetch exercises' },
      { status: 500 }
    );
  }
} 