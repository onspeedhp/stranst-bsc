import db from '@/lib/db'; // Ensure this is your database connection pool
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { walletAddress, amount, total } = body;

    await db.query(
      'INSERT INTO minted ("walletAddress", amount, total) VALUES ($1, $2, $3) RETURNING *',
      [walletAddress, amount, total]
    );

    return NextResponse.json({ message: 'success' });
  } catch (error) {
    console.error('Error inserting into minted:', error);
    return NextResponse.json(
      { error: 'Failed to update data' },
      { status: 500 }
    );
  }
}
