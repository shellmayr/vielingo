import { NextRequest, NextResponse } from 'next/server';
import { exercises, VocabularyItem } from '@/data/exercises';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const level = searchParams.get('level');
    const limit = searchParams.get('limit');
    const random = searchParams.get('random');

    // Extract all vocabulary items from exercises
    let allVocabulary: (VocabularyItem & { exerciseId: string; exerciseTitle: string })[] = [];
    
    exercises.forEach(exercise => {
      if (exercise.content?.vocabularyItems) {
        const vocabularyWithContext = exercise.content.vocabularyItems.map(item => ({
          ...item,
          exerciseId: exercise.id,
          exerciseTitle: exercise.title
        }));
        allVocabulary = allVocabulary.concat(vocabularyWithContext);
      }
    });

    // Filter by level if provided
    if (level && ['Beginner', 'Intermediate', 'Advanced'].includes(level)) {
      allVocabulary = allVocabulary.filter(item => {
        const exercise = exercises.find(ex => ex.id === item.exerciseId);
        return exercise?.level === level;
      });
    }

    // Randomize if requested
    if (random === 'true') {
      allVocabulary = [...allVocabulary].sort(() => 0.5 - Math.random());
    }

    // Apply limit if specified
    if (limit) {
      const limitNumber = parseInt(limit);
      if (!isNaN(limitNumber) && limitNumber > 0) {
        allVocabulary = allVocabulary.slice(0, limitNumber);
      }
    }

    // Get unique German words count
    const uniqueWords = new Set(allVocabulary.map(item => item.german.toLowerCase())).size;

    return NextResponse.json({
      vocabulary: allVocabulary,
      total: allVocabulary.length,
      uniqueWords,
      filters: {
        level: level || null,
        random: random === 'true',
        limit: limit ? parseInt(limit) : null
      }
    });

  } catch (error) {
    console.error('Error fetching vocabulary:', error);
    return NextResponse.json(
      { error: 'Failed to fetch vocabulary' },
      { status: 500 }
    );
  }
} 